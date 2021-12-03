import axios from 'axios';
import { ILoginValues } from '../models/ILoginValues.model';

const loginSubmit = async (loginValues: ILoginValues): Promise<string> => {
	const result = await axios({
		method: 'POST',
		data: {
			username: loginValues.email,
			password: loginValues.password,
		},
		withCredentials: true,
		url: 'http://localhost:8080/users/login',
	});
	if (result.data.user) return result.data.user.email;
	else return 'error logging in';
};

export default loginSubmit;
