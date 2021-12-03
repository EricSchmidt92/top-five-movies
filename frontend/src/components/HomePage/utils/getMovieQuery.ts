import axios from 'axios';

const getMovieQuery = async (movieQuery: string) => {
	try {
		if (movieQuery.length <= 0) return [];
		const result = await axios({
			method: 'GET',
			withCredentials: true,
			url: `http://localhost:8080/movies/search/${movieQuery}`,
		});

		return result.data;
	} catch (error) {
		let message = 'error getting movie data';
		if (error instanceof Error) message = `Error: ${error.message}`;
		return message;
	}
};

export default getMovieQuery;
