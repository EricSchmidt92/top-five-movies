import axios from 'axios';
import { IRegisterValues } from '../models/IRegisterValues.model';
import { IUser } from '../models/IUser.model';

const registerSubmit = async ({
	firstName,
	lastName,
	password,
	email,
}: IRegisterValues): Promise<IUser> => {
	const result = await axios({
		method: 'POST',
		data: {
			firstName,
			lastName,
			password,
			email,
		},
		withCredentials: true,
		url: 'http://localhost:8080/users',
	});
	if (result.data.user) return result.data.user;

	return { firstName, lastName, email, error: `Error: ${result.data.message}` };
};

export default registerSubmit;
