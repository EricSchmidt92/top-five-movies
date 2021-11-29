import { Box, VStack } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';
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

		console.log('current user: ', user);
	};

	useEffect(() => {
		setUp();
	}, []);

	return (
		<VStack alignItems='center' justify='center' h='100vh'>
			{user ? (
				<Box alignItems='center'>
					this is the home page of {user} with an id of {userId}
				</Box>
			) : (
				<div>no user found</div>
			)}
		</VStack>
	);
};

export default HomePage;
