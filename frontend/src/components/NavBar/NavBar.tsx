import {
	Box,
	Flex,
	Button,
	useColorModeValue,
	Stack,
	useColorMode,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/layout';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { HomePageContext } from '../../contexts/HomePageContext';
import { useContext } from 'react';
import axios from 'axios';

const NavBar = () => {
	const history = useHistory();
	const { colorMode, toggleColorMode } = useColorMode();
	const { currentUser, setCurrentUser }: any = useContext(HomePageContext);
	let buttonColorMode = useColorModeValue('black', 'white');

	const handleLogOut = async () => {
		try {
			const result = await axios({
				method: 'GET',
				withCredentials: true,
				url: 'http://localhost:8080/users/logout',
			});
			setCurrentUser('');
			history.push('/');
			console.log(result.data);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
		console.log('logging out now');
	};

	return (
		<Box
			bg={useColorModeValue('gray.200', 'gray.900')}
			px={4}
			position='fixed'
			w='100%'
		>
			<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
				<Link as={RouterLink} to='/home'>
					Top Five Movies
				</Link>

				<Flex alignItems='center'>
					<Stack direction={'row'} spacing={7} alignItems='center'>
						<Button onClick={toggleColorMode}>
							{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						</Button>
						{!currentUser && (
							<>
								<Link
									as={RouterLink}
									to='/'
									fontWeight={400}
									color={buttonColorMode}
								>
									Sign In
								</Link>
								<Button as={RouterLink} to='/register' colorScheme='purple'>
									Sign Up
								</Button>
							</>
						)}
						{currentUser && (
							<Button onClick={handleLogOut} colorScheme='purple'>
								Sign Out
							</Button>
						)}
					</Stack>
				</Flex>
			</Flex>
		</Box>
	);
};

export default NavBar;
