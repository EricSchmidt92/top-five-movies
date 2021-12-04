import axios, { AxiosResponse } from 'axios';
import IMovieFavoritesDto from '../models/IMovieFavoritesDto.model';

interface IPostMovieResult {
	result: AxiosResponse | undefined;
	error: string | undefined;
}

const postMovies = async (
	movies: IMovieFavoritesDto[]
): Promise<IPostMovieResult> => {
	try {
		const result = await axios({
			method: 'POST',
			data: {
				movies,
			},
			withCredentials: true,
			url: 'http://localhost:8080/favorites',
		});

		return { result, error: undefined };
	} catch (error) {
		let message = 'error with creating movie list';
		if (error instanceof Error) message = `Error: ${error.message}`;

		return { error: message, result: undefined };
	}
};

export default postMovies;
