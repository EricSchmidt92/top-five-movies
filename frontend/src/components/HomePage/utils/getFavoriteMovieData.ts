import axios from 'axios';
import { IMovie } from '../models/IMovie.model';
import { IMovieFavoritesDto } from '../models/IMovieFavoritesDto.model';
const getFavoriteMovieData = async (
	movies: IMovieFavoritesDto[]
): Promise<IMovie[]> => {
	try {
		const callApi = async (id: number) => {
			const result = await axios({
				method: 'GET',
				withCredentials: true,
				url: `http://localhost:8080/movies/data/${id}`,
			});
			return result.data;
		};

		// const resultsArr: IMovie[] = await Promise.all(
		// 	movies.map(({ movie_id }) => callApi(movie_id))
		// );

		const resultsArr = await Promise.all(
			movies.reduce((acc, { movie_id }) => {
				if (movie_id) {
					const val = callApi(movie_id);
					return [...acc, callApi(movie_id)];
				}
				return acc;
			}, [] as Promise<IMovie>[])
		);

		return resultsArr;
	} catch (error) {
		let message = 'error getting movie data';
		if (error instanceof Error) message = `Error: ${error.message}`;
		return [{ id: -1, error: message }];
	}
};

export default getFavoriteMovieData;
