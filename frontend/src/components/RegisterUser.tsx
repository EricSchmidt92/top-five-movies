import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterUser() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [currentUser, setCurrentUser] = useState('');

	const movieData = [
		{
			movie_id: 49018,
			rank: 1,
		},
		{
			movie_id: 49018,
			rank: 2,
		},
		{
			movie_id: 49018,
			rank: 3,
		},
		{
			movie_id: 49018,
			rank: 4,
		},
		{
			movie_id: 49018,
			rank: 5,
		},
	];
	const updateMovieData = [
		{
			movie_id: 12345,
			rank: 1,
		},
		{
			movie_id: 12345,
			rank: 2,
		},
		{
			movie_id: 12345,
			rank: 3,
		},
		{
			movie_id: 12345,
			rank: 4,
		},
		{
			movie_id: 12345,
			rank: 5,
		},
	];

	const register = async () => {
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
		console.log(result);
	};

	const login = async () => {
		const result = await axios({
			method: 'POST',
			data: {
				username: loginEmail,
				password: loginPassword,
			},
			withCredentials: true,
			url: 'http://localhost:8080/users/login',
		});
		console.log(result.data);
	};

	const getUser = async () => {
		try {
			const result = await axios({
				method: 'GET',
				withCredentials: true,
				url: 'http://localhost:8080/users',
			});
			setCurrentUser(result.data.email);
			console.log(result.data);
		} catch (error) {
			if (error instanceof Error) {
				setCurrentUser(error.message);
			}
		}
	};

	const createTopFive = async () => {
		try {
			const result = await axios({
				method: 'POST',
				data: {
					movies: movieData,
				},
				withCredentials: true,
				url: 'http://localhost:8080/favorites',
			});

			console.log(result);
		} catch (error) {
			console.log(error);
		}
	};

	const getTopFive = async () => {
		try {
			const result = await axios({
				method: 'GET',
				withCredentials: true,
				url: 'http://localhost:8080/favorites',
			});

			console.log(result);
			console.log(result.data);
		} catch (error) {}
	};

	const updateTopFive = async () => {
		try {
			const result = await axios({
				method: 'PUT',
				data: {
					movies: updateMovieData,
				},
				withCredentials: true,
				url: 'http://localhost:8080/favorites',
			});

			console.log(result);
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		try {
			const result = await axios({
				method: 'GET',
				withCredentials: true,
				url: 'http://localhost:8080/users/logout',
			});
			console.log(result);
			console.log(result.data);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	};

	return (
		<div>
			<h1>This is the register/login page</h1>
			<h2>Register</h2>
			<input
				type='text'
				placeholder='First name'
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
			<button onClick={register}>Register</button>
			<h2>Login</h2>
			<input
				type='email'
				placeholder='email'
				onChange={e => setLoginEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='password'
				onChange={e => setLoginPassword(e.target.value)}
			/>
			<button onClick={login}>Login</button>
			<h2>Get Current user</h2>
			<button onClick={getUser}>Get User</button>
			{currentUser ? currentUser : 'NO USER YET'}
			<h2>LogOut</h2>
			<button onClick={logout}>Logout</button>
			<br />
			<button onClick={createTopFive}>Create favorites</button>
			<br />
			<br />
			<br />
			<button onClick={updateTopFive}>Update top five</button> <br />
			<br />
			<br />
			<button onClick={getTopFive}>Get top five</button>
		</div>
	);
}
