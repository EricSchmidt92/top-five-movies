import { Request, Response } from 'express';
import { IUser } from '../../models/IUser';
import { IMovie } from '../../models/IMovie';
// const db = require('../../db');
import * as db from '../../db';

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
		console.log('in create Favorites');
		// console.log('req.user: ', req.user);
		// console.log('req.body: ', req.body.movies);
		if (!req.user) throw Error('No user logged in');
		// console.log('found user');
		if (!req.body.movies) throw Error('No movies provided');
		// console.log('found movies');
		const user: IUser = req.user;
		const movies: IMovie[] = req.body.movies;
		if (!user.id) throw Error;
		// console.log('found user id');

		// const values = movies.map(({ movie_id, rank }) => [
		//   user.id,
		//   movie_id,
		//   rank,
		// ]);
		const userId = user.id;
		const insertedMovies = await db.createFavorites(userId, movies);
		// console.log(insertedMovies);
		if (insertedMovies === undefined) throw Error;

		res.status(201).json(insertedMovies);
	} catch (error) {
		let message = 'failed to create top 5 list';

		if (error instanceof Error) message = error.message;

		res.status(400).json({ message });
	}
};

export const getFavorites = async (req: Request, res: Response) => {
	// console.log('hitting get Favorites');
	try {
		if (!req.user) throw new Error('No user found');
		const user: IUser = req.user;
		if (!user.id) throw new Error('Invalid user: No user id found');

		const userMovies = await db.getFavorites(user.id);

		if (userMovies.length < 1) {
			// console.log('no movies found!');
			res.status(200).send({ message: 'no user list found' });
			return;
		}
		//! GET MOVIE DATA HERE

		res.status(200).json(userMovies);
	} catch (error) {
		let message = 'failed to create top 5 list';

		if (error instanceof Error) message = error.message;

		res.status(400).json({ message });
	}
};

export const updateFavorites = async (req: Request, res: Response) => {
	try {
		if (!req.user) throw new Error('No user found');
		if (!req.body.movies) throw new Error('No list of movies provided');
		const user: IUser = req.user;
		const movies: IMovie[] = req.body.movies;
		if (!user.id) throw Error;

		const updatedMovies = await db.updateFavorites(user.id, movies);
		res.status(200).json({
			message: `Movie List has been updated: ${updatedMovies.length} movie ranks updated`,
			movies: updatedMovies,
		});
	} catch (error) {
		let message = 'failed to update top 5 list';

		if (error instanceof Error) message = error.message;

		res.status(400).json({ message });
	}
};
