import axios from 'axios';
import React, { useEffect, useState } from 'react';
import getCurrentUser from './utils/getCurrentUser';
// import { useHistory } from 'react-router';

const HomePage = () => {
	// const history = useHistory();
	const [user, setUser] = useState('');
	const [userId, setUserId] = useState('');

	const setUp = async () => {
		const user = await getCurrentUser();
		if (user.error !== undefined) {
			console.log(user.error);
		}

		setUser(user.email);
		setUserId(user.id);
	};

	useEffect(() => {
		setUp();
	}, []);

	return (
		<div>
			{user ? (
				<div>
					this is the home page of {user} with an id of {userId}
				</div>
			) : (
				<div>no user found</div>
			)}
		</div>
	);
};

export default HomePage;
