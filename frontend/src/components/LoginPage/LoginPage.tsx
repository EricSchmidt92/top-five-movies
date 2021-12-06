import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex, Heading, Link, VStack } from '@chakra-ui/layout';
import { FormEvent, SyntheticEvent, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { ILoginValues } from './models/ILoginValues.model';
import { HomePageContext } from '../../contexts/HomePageContext';
import { Link as RouterLink } from 'react-router-dom';

type LoginProps = {
	submit: (loginValues: ILoginValues) => Promise<string>;
};

const LoginPage = ({ submit }: LoginProps) => {
	// const { toggleColorMode } = useColorMode();
	const formBackground = useColorModeValue('gray.100', 'gray.700');
	const history = useHistory();

	// const [email, setEmail] = useState('eric@gmail.com');
	// const [password, setPassword] = useState('sosecure');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { setCurrentUser }: any = useContext(HomePageContext);

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		const result = await submit({ email, password });
		if (result === 'error logging in') {
			return;
		}
		setCurrentUser(result);
		history.push('/home');
	};

	return (
		<Flex height='100vh' alignItems='center' justifyContent='center'>
			<form onSubmit={handleSubmit}>
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
							value={password}
							onChange={(e: FormEvent<HTMLInputElement>) =>
								setPassword(e.currentTarget.value)
							}
							autoComplete='true'
						/>
					</FormControl>
					<Button colorScheme='purple' type='submit' alignSelf='center'>
						Log In
					</Button>
					<Link color='purple.700' as={RouterLink} to='/register'>
						New? Register here
					</Link>
					{/* <Button onClick={toggleColorMode}>Toggle Color Mode</Button> */}
				</VStack>
			</form>
		</Flex>
	);
};

export default LoginPage;
