import axios from 'axios';

const getFavoriteMoviesData = async () => {
	const apiKey = process.env.API_KEY;
	//! change this query url
	const queryURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
	const result = await axios({
		method: 'GET',
		url: queryURL,
	});

	return result.data;
};

export default getFavoriteMoviesData;
