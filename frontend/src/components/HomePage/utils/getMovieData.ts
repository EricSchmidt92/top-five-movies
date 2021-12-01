import axios from 'axios';

const getMovieData = async () => {
	try {
		const result = await axios({
			method: 'GET',
			withCredentials: true,
			url: 'http://localhost:8080/movies',
		});

		return result.data;
	} catch (error) {
		let message = 'error getting movie data';
		if (error instanceof Error) message = `Error: ${error.message}`;
		return message;
	}
};

export default getMovieData;
