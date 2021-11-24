import { Button } from '@chakra-ui/button';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { Input } from '@chakra-ui/input';
import { Flex, Heading, VStack } from '@chakra-ui/layout';
import React from 'react';
import { useHistory } from 'react-router';

const LoginPage = () => {
	const { toggleColorMode } = useColorMode();
	const formBackground = useColorModeValue('gray.100', 'gray.700');
	const history = useHistory();

	const handleLogIn = () => {
		console.log('logged in');
		history.push('/home');
	};

	return (
		<Flex height='100vh' alignItems='center' justifyContent='center'>
			<VStack background={formBackground} p={12} rounded={6}>
				<Heading mb={6}>Log In</Heading>

				<Input
					placeholder='JohnDoe@gmail.com'
					variant='filled'
					mb={3}
					type='email'
				/>

				<Input placeholder='******' variant='filled' mb={6} type='password' />
				<Button colorScheme='purple' onClick={handleLogIn}>
					Log In
				</Button>
				<Button onClick={toggleColorMode}>Toggle Color Mode</Button>
			</VStack>
		</Flex>
	);
};

export default LoginPage;
