import { Button } from '@chakra-ui/button';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex, Heading, VStack } from '@chakra-ui/layout';
import React, { FormEvent, SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router';

type LoginProps = {
	handleLogIn: (event: SyntheticEvent) => void;
};

const LoginPage = ({ handleLogIn }: LoginProps) => {
	const { toggleColorMode } = useColorMode();
	const formBackground = useColorModeValue('gray.100', 'gray.700');
	const history = useHistory();

	const [email, setEmail] = useState('');

	return (
		<Flex height='100vh' alignItems='center' justifyContent='center'>
			<form onSubmit={handleLogIn}>
				<VStack background={formBackground} p={12} rounded={6}>
					<Heading mb={6}>Log In</Heading>
					<FormControl isRequired>
						<FormLabel>Email</FormLabel>
						<Input
							placeholder='JohnDoe@gmail.com'
							variant='filled'
							mb={3}
							type='email'
							value={email}
							onChange={(e: FormEvent<HTMLInputElement>) =>
								setEmail(e.currentTarget.value)
							}
						/>
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Password</FormLabel>
						<Input
							placeholder='******'
							variant='filled'
							mb={6}
							type='password'
						/>
					</FormControl>
					<Button colorScheme='purple' type='submit' alignSelf='center'>
						Log In
					</Button>
					<Button onClick={toggleColorMode}>Toggle Color Mode</Button>
				</VStack>
			</form>
		</Flex>
	);
};

export default LoginPage;
