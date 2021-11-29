import axios from 'axios';
import { ICurrentUser } from '../models/ICurrentUser.model';

const getCurrentUser = async (): Promise<ICurrentUser> => {
	try {
		const result = await axios({
			method: 'GET',
			withCredentials: true,
			url: 'http://localhost:8080/users',
		});

		// need email and id from this call.
		if (!result.data.email || !result.data.id) throw new Error('No user found');

		const user: ICurrentUser = {
			email: result.data.email,
			id: result.data.id,
		};

		return user;
	} catch (error) {
		if (error instanceof Error) {
			return { email: '', id: '', error: `Error: ${error.message}` };
		}

		return {
			email: '',
			id: '',
			error: `Error: something went wrong... ${error}`,
		};
	}
};

export default getCurrentUser;
