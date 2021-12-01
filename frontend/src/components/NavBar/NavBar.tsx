import {
	Flex,
	Button,
	useColorModeValue,
	Stack,
	useColorMode,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';
import { HomePageContext } from '../../contexts/HomePageContext';
import { Link } from '@chakra-ui/layout';
import { MoonIcon, Search2Icon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { FormEvent, useContext } from 'react';
import axios from 'axios';

const NavBar = () => {
	const history = useHistory();
	const { colorMode, toggleColorMode } = useColorMode();
	const { currentUser, setCurrentUser, searchQuery, setSearchQuery }: any =
		useContext(HomePageContext);
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
		<Flex
			as='nav'
			bg={useColorModeValue('gray.200', 'gray.900')}
			p={4}
			align='center'
			justify='space-between'
			position='sticky'
			top='0'
			w='100%'
		>
			<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
				<Link as={RouterLink} to='/home'>
					Top Five Movies
				</Link>
			</Flex>
			<Flex
				flex='2'
				mx={36}
				boxShadow='base'
				outlineColor='gray.400'
				rounded={6}
			>
				<InputGroup>
					<InputLeftElement pointerEvents='none' children={<Search2Icon />} />
					<Input
						placeholder='Enter a movie to search'
						variant='outline'
						value={searchQuery}
						onChange={(e: FormEvent<HTMLInputElement>) =>
							setSearchQuery(e.currentTarget.value)
						}
					/>
				</InputGroup>
			</Flex>
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
	);
};

export default NavBar;
