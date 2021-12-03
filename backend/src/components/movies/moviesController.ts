import { Request, Response } from 'express';
import { IUser } from '../../models/IUser';
import axios from 'axios';
import { IMovieDto } from '../../models/IMovieDto';
import getPosterPathConfiguration from './utils/getPosterPathConfiguration';

export const getPopularMovies = async (req: Request, res: Response) => {
	try {
		if (!req.user) throw Error('No user logged in');
		const apiKey = process.env.API_KEY;
		const queryURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

		const result = await axios({
			method: 'GET',
			url: queryURL,
		});

		const basePosterPath = await getPosterPathConfiguration();

		const moviesArr = result.data.results;

		//! what I need to display:
		//! poster: get from poster_path property (another call),
		//! title: title property,
		//! genre: genre_ids[] (separate call),
		//! overview: can use overview item,
		//! leading cast: have to get movie details from another api call

		const movieList: IMovieDto[] = moviesArr.map(
			({ id, title, poster_path, genre_ids, overview }: any) => {
				const movieDto: IMovieDto = {};
				if (id) movieDto.id = id;
				if (title) movieDto.title = title;
				if (poster_path) movieDto.posterPath = basePosterPath + poster_path;
				if (genre_ids) movieDto.genres = genre_ids;
				if (overview) movieDto.overview = overview;
				return movieDto;
			}
		);

		res.status(200).json(movieList);
	} catch (error) {
		let message = 'something went wrong';
		if (error instanceof Error) message = error.message;
		res.status(400).json({ message });
	}
};

export const getMovieQuery = async (req: Request, res: Response) => {
	try {
		if (!req.user) throw Error('No user logged in');
		const apiKey = process.env.API_KEY;
		const encodedQuery = encodeURI(req.params.movie);
		const queryURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodedQuery}&page=1&include_adult=false`;
		const basePosterPath = await getPosterPathConfiguration();

		const result = await axios({
			method: 'GET',
			url: queryURL,
		});

		const moviesArr = result.data.results;

		const movieList: IMovieDto[] = moviesArr.map(
			({ id, title, poster_path, genre_ids, overview }: any) => {
				const movieDto: IMovieDto = {};
				if (id) movieDto.id = id;
				if (title) movieDto.title = title;
				if (poster_path) movieDto.posterPath = basePosterPath + poster_path;
				if (genre_ids) movieDto.genres = genre_ids;
				if (overview) movieDto.overview = overview;
				return movieDto;
			}
		);

		res.status(200).json(movieList);
	} catch (error) {
		let message = 'something went wrong';
		if (error instanceof Error) message = error.message;
		res.status(400).json({ message });
	}
};

export const getOneMovie = async (req: Request, res: Response) => {
	//! implement me!
};
