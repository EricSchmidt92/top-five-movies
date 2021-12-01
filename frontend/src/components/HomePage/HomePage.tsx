import { Box, HStack, SimpleGrid, VStack } from '@chakra-ui/layout';
import { useContext, useEffect, useState } from 'react';
import getCurrentUser from './utils/getCurrentUser';
import { HomePageContext } from '../../contexts/HomePageContext';
import getMovieData from './utils/getMovieData';
import { IMovie } from './models/IMovie.model';
import MovieCard from '../MovieCard/MovieCard';
import { Text } from '@chakra-ui/react';

const HomePage = () => {
	// const history = useHistory();
	const [user, setUser] = useState('');
	const [userId, setUserId] = useState('');
	const [movies, setMovies] = useState<IMovie[]>([{}]);

	const setUpUser = async () => {
		try {
			const user = await getCurrentUser();
			if (user.error !== undefined) {
				console.log(user.error);
			}

			setUser(user.email);
			setUserId(user.id);
			console.log('current user: ', user);
		} catch (error) {
			let message = 'error with fetching user';
			if (error instanceof Error) message = `Error: ${error.message}`;
			console.log(message);
		}
	};

	const setUpMovies = async () => {
		try {
			const returnedMovies = await getMovieData();
			const newMovieList: IMovie[] = [...returnedMovies];
			console.log(newMovieList);
			setMovies(oldArr => [...newMovieList]);
		} catch (error) {
			let message = 'error with fetching user';
			if (error instanceof Error) message = `Error: ${error.message}`;
			console.log(message);
		}
	};

	useEffect(() => {
		setUpUser();
		setUpMovies();
	}, []);

	const { searchQuery }: any = useContext(HomePageContext);

	return (
		<VStack>
			<VStack border='1px solid black' w='full' h={80}>
				<Text fontSize='4xl'>Your Top 5</Text>
			</VStack>
			<SimpleGrid columns={5} spacing={6} mt={6}>
				{movies.map((movie, index) => {
					return <MovieCard key={index} movie={movie} />;
				})}
			</SimpleGrid>
		</VStack>
	);
};

export default HomePage;
