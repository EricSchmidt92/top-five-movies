import { INewUser } from '../models/INewUser';

const { Pool } = require('pg');

import format from 'pg-format';
import { IMovie } from '../models/IMovie';

const dbName =
	process.env.NODE_ENV === 'test' ? 'top-5-movies-test' : 'top-5-movies';

console.log('Now using database: ', dbName);

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	// host: 'host.docker.internal',
	database: dbName,
	password: 'password',
	port: 5432,
});
export const query = (text: any, params: any) => pool.query(text, params);

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

	// console.log('values: ', values);
	const queryText = format(
		'INSERT INTO user_favorites (user_id, movie_id, rank) VALUES %L ON CONFLICT DO NOTHING RETURNING *',
		values
	);

	const insertedMovies = await query(queryText, []);
	// console.log('inserted movies: ', insertedMovies);
	const returnMovies: IMovie[] = insertedMovies.rows.map(
		({ movie_id, rank }: any) => {
			return { movie_id, rank: parseInt(rank) };
		}
	);
	// console.log('return movies', returnMovies);
	return returnMovies;
};

export const getFavorites = async (id: string): Promise<IMovie[]> => {
	const queryText = `SELECT * FROM user_favorites WHERE user_id = $1`;
	const returnedMovies = await query(queryText, [id]);

	const userMovies: IMovie[] = returnedMovies.rows.map(
		({ movie_id, rank }: any) => {
			return { movie_id, rank: parseInt(rank) };
		}
	);

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

	const returnedMovies = await query(queryText, [id]);

	// console.log('returnedMovies', returnedMovies.rows);
	const updatedMovies: IMovie[] = returnedMovies.rows.map(
		({ movie_id, rank }: any) => {
			return { movie_id, rank: parseInt(rank) };
		}
	);

	return updatedMovies;
};
