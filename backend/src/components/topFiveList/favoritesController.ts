import { Request, Response } from 'express';
import { IUser } from '../../models/IUser';
import { IMovie } from '../../models/IMovie';
const db = require('../../db');

import format from 'pg-format';
//STRUCTURE OF REQUEST:
/* 
  must grab ID from db, and insert that into user_favorites table too
  {
    "email": "theemail@email.com",
    "movies": [
      {
        "movie_id": "1234",
        "rank": 1
      }
    ]
  }

*/

// TODO look into proper status codes for all handlers

export const createFavorites = async (req: Request, res: Response) => {
  try {
    const user: IUser = req.user || '';
    const movies: IMovie[] = req.body.movies;
    if (!user || !movies) throw Error;

    const values = movies.map(({ movie_id, rank }) => [
      user.id,
      movie_id,
      rank,
    ]);

    const queryText = format(
      'INSERT INTO user_favorites (user_id, movie_id, rank) VALUES %L ON CONFLICT DO NOTHING RETURNING *',
      values
    );

    const insertedMovies = await db.query(queryText, []);
    if (insertedMovies.rows[0] === undefined) throw Error;

    res.status(200).json(insertedMovies.rows[0]);
  } catch (error) {
    let message = 'failed to create top 5 list';

    if (error instanceof Error) message = error.message;

    res.status(400).json({ message });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  console.log('hitting get Favorites');
  try {
    const user: IUser = req.user || '';
    if (!user) throw new Error('No user found');

    const queryText = `SELECT (movie_id, rank) FROM user_favorites WHERE user_id = $1`;
    const userMovies = await db.query(queryText, [user.id]);

    if (userMovies.rows.length < 1) throw new Error('error fetching movies.');

    res.status(200).json(userMovies.rows);
  } catch (error) {
    let message = 'failed to create top 5 list';

    if (error instanceof Error) message = error.message;

    res.status(400).json({ message });
  }
};

export const updateFavorites = async (req: Request, res: Response) => {
  try {
    const user: IUser = req.user || '';
    const movies: IMovie[] = req.body.movies;
    if (!user || !movies) throw Error;

    const values = movies.map(({ movie_id, rank }) => [movie_id, rank]);
    const queryText = format(
      `UPDATE 
      user_favorites AS uf 
    SET 
      movie_id = vals.m::integer
    FROM
      (VALUES %L) AS vals(m, r)
    WHERE 
      user_id = $1 AND rank = vals.r::movie_rank RETURNING *`,
      values
    );

    const updatedMovies = await db.query(queryText, [user.id]);
    res.status(200).json({
      message: `Movie List has been updated: ${updatedMovies.rows.length} movie ranks updated`,
    });
  } catch (error) {
    let message = 'failed to update top 5 list';

    if (error instanceof Error) message = error.message;

    res.status(400).json({ message });
  }
};
