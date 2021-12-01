import axios from 'axios';
import { query } from 'express';

const getPosterPathConfiguration = async () => {
	try {
		const apiKey = process.env.API_KEY;
		const url = `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;
		let size;

		const result = await axios({
			method: 'GET',
			url,
		});

		const imagesData = result.data.images;

		const { base_url, poster_sizes } = imagesData;

		if (!base_url || !poster_sizes || poster_sizes.length < 1) {
			throw new Error('No poster sizes or base url detected');
		}

		if (poster_sizes.includes('w185')) {
			size = 'w185';
		} else if (poster_sizes.includes('w154')) {
			size = 'w154';
		} else {
			size = poster_sizes[0];
		}

		// console.log('config results: ', result.data);
		// console.log(`path: ${base_url}${size}`);
		return `${base_url}${size}`;
	} catch (error) {
		let message = 'something went wrong';
		if (error instanceof Error) message = error.message;
		return `Unable to locate poster: ${message}`;
	}
};

export default getPosterPathConfiguration;
