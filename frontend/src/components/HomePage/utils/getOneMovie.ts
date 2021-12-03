import axios from 'axios';

const getOneMovie = async (movieId: number) => {
	try {
		const result = await axios({
			method: 'GET',
			withCredentials: true,
			url: `http://localhost:8080/movies/details/${movieId}`,
		});

		console.log('getOneMovie results', result);
	} catch (error) {
		let message = 'error getting movie data';
		if (error instanceof Error) message = `Error: ${error.message}`;
		return message;
	}
};
