import { INewUser } from '../models/INewUser';

const { Pool } = require('pg');

import format from 'pg-format';
import { IMovie } from '../models/IMovie';

const pool = new Pool({
	user: 'postgres',
	// user: 'sysadmin',
	host: 'localhost',
	// host: 'localhost',
	// host: 'host.docker.internal',
	database: 'top-5-movies',
	password: 'password',
	port: 5432,
});

const query = (text: any, params: any) => pool.query(text, params);

export const getCurrentUser = async (email: string) => {
	const currentUser = await query('SELECT * FROM users WHERE email = $1', [
		email,
	]);

	return currentUser;
};

export const createUser = async (newUserModel: INewUser) => {
	const { firstName, lastName, hashedPassword, email } = newUserModel;
	const newUser = await query(
		'INSERT INTO users (first_name, last_name, password, email) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING *',
		[firstName, lastName, hashedPassword, email]
	);

	return newUser;
};

export const createFavorites = async (id: string, movies: IMovie[]) => {
	const values = movies.map(({ movie_id, rank }) => [id, movie_id, rank]);

	const queryText = format(
		'INSERT INTO user_favorites (user_id, movie_id, rank) VALUES %L ON CONFLICT DO NOTHING RETURNING *',
		values
	);

	const insertedMovies = await query(queryText, []);

	return insertedMovies;
};

export const getFavorites = async (id: string) => {
	const queryText = `SELECT (movie_id, rank) FROM user_favorites WHERE user_id = $1`;
	const userMovies = await query(queryText, [id]);

	return userMovies;
};

export const updateFavorites = async (id: string, movies: IMovie[]) => {
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

	const updatedMovies = await query(queryText, [id]);
	return updatedMovies;
};
