import axios from 'axios';

const getUserFavorites = async () => {
	try {
		const result = await axios({
			method: 'GET',
			withCredentials: true,
			url: 'http://localhost:8080/favorites',
		});

		if (result.data.hasOwnProperty('message')) {
			return { message: 'no list found' };
		}
		return result.data;
	} catch (error) {
		let message = 'something went wrong getting user favorites';
		if (error instanceof Error) message = `Error: ${error.message}`;
		return message;
	}
};

export default getUserFavorites;
