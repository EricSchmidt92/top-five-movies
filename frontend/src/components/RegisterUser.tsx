import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterUser() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const register = async () => {
		const result = await axios({
			method: 'post',
			data: {
				firstName,
				lastName,
				password,
				email,
			},
			withCredentials: true,
			url: 'http://localhost:8080/users',
		});
		console.log(result);
	};

	return (
		<div>
			<h1>This is the register page</h1>
			<input
				type='text'
				placeholder='Fist name'
				onChange={e => setFirstName(e.target.value)}
			/>
			<input
				type='text'
				placeholder='Last Name'
				onChange={e => setLastName(e.target.value)}
			/>
			<input
				type='password'
				placeholder='password'
				onChange={e => setPassword(e.target.value)}
			/>
			<input
				type='email'
				placeholder='email'
				onChange={e => setEmail(e.target.value)}
			/>
			<button onClick={register}>Submit</button>
		</div>
	);
}
