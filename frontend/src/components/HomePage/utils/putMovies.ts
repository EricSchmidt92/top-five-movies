import axios, { AxiosResponse } from 'axios';
import IMovieFavoritesDto from '../models/IMovieFavoritesDto.model';

interface IPutMovieResult {
	result: AxiosResponse | undefined;
	error: string | undefined;
}

const putMovies = async (
	movies: IMovieFavoritesDto[]
): Promise<IPutMovieResult> => {
	try {
		const result = await axios({
			method: 'PUT',
			data: {
				movies,
			},
			withCredentials: true,
			url: 'http://localhost:8080/favorites',
		});

		console.log('put results!', result.data);
		return { result: result.data, error: undefined };
	} catch (error) {
		let message = 'error updating top 5 movie list';
		if (error instanceof Error) message = `Error with update: ${error.message}`;
		return { error: message, result: undefined };
	}
};

export default putMovies;
