import { useColorModeValue } from '@chakra-ui/react';
import { FormEvent, SyntheticEvent, useContext, useState } from 'react';
import { Flex, Heading, VStack } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Button } from '@chakra-ui/button';
import { IRegisterValues } from './models/IRegisterValues.model';
import { INewUserData } from './models/INewUserData.model';
import { IUser } from './models/IUser.model';
import loginSubmit from '../LoginPage/utils/loginSubmit';

import { HomePageContext } from '../../contexts/HomePageContext';
import { useHistory } from 'react-router';

type RegisterProps = {
	submit: (registerValues: IRegisterValues) => Promise<IUser>;
};

const RegisterPage = ({ submit }: RegisterProps) => {
	// const { toggleColorMode } = useColorMode();
	const formBackground = useColorModeValue('gray.100', 'gray.700');
	const history = useHistory();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { setCurrentUser }: any = useContext(HomePageContext);

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		const newUserData: INewUserData = { firstName, lastName, email, password };
		const user = await submit(newUserData);

		console.log(user);
		if (user.error !== undefined) {
			return user.error;
		}

		const loggedInUser = await loginSubmit({ email, password });
		if (loggedInUser === 'error loggin in') {
			return;
		}

		setCurrentUser(loggedInUser);
		history.push('/home');
	};

	return (
		<Flex height='100vh' alignItems='center' justifyContent='center'>
			<form onSubmit={handleSubmit}>
				<VStack background={formBackground} p={12} rounded={6}>
					<Heading mb={6}>Register</Heading>
					<FormControl isRequired>
						<FormLabel>First Name</FormLabel>
						<Input
							placeholder='John'
							variant='filled'
							mb={3}
							type='text'
							value={firstName}
							onChange={(e: FormEvent<HTMLInputElement>) =>
								setFirstName(e.currentTarget.value)
							}
						/>
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Last Name</FormLabel>
						<Input
							placeholder='Doe'
							variant='filled'
							mb={6}
							type='text'
							value={lastName}
							onChange={(e: FormEvent<HTMLInputElement>) =>
								setLastName(e.currentTarget.value)
							}
						/>
					</FormControl>

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
							value={password}
							onChange={(e: FormEvent<HTMLInputElement>) =>
								setPassword(e.currentTarget.value)
							}
							autoComplete='true'
						/>
					</FormControl>

					<Button colorScheme='purple' type='submit'>
						Create Account
					</Button>
				</VStack>
			</form>
		</Flex>
	);
};

export default RegisterPage;
