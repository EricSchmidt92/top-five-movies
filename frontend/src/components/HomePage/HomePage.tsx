import {
	Text,
	Button,
	useColorModeValue,
	HStack,
	SimpleGrid,
	VStack,
} from '@chakra-ui/react';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import getCurrentUser from './utils/getCurrentUser';
import getMovieQuery from './utils/getMovieQuery';
import getPopularMovieData from './utils/getPopularMovieData';
import getUserFavorites from './utils/getUserFavorites';
import { HomePageContext } from '../../contexts/HomePageContext';
import IMovie from './models/IMovie.model';
import MovieCard from '../MovieCard/MovieCard';
import postMovies from './utils/postMovies';
import IMovieFavoritesDto from './models/IMovieFavoritesDto.model';
import getFavoriteMovieData from './utils/getFavoriteMovieData';
import putMovies from './utils/putMovies';

const HomePage = () => {
	const [movies, setMovies] = useState<IMovie[]>([]);
	const [queriedMovies, setQueriedMovies] = useState<IMovie[]>([]);
	const [favoriteMovies, setFavoriteMovies] = useState<IMovie[]>([]);
	const [isNewUser, setIsNewUser] = useState(false);
	const { searchQuery }: any = useContext(HomePageContext);
	const background = useColorModeValue('gray.100', 'gray.800');

	const handleMovieClick = (event: SyntheticEvent, movie: IMovie) => {
		if (favoriteMovies.length >= 5) {
			//TODO change this later to better error message
			alert('only 5 movies allowed');
			return;
		}

		if (
			favoriteMovies.find(favorite => favorite.id === movie.id) !== undefined
		) {
			//TODO change this later to better error message
			alert('no duplicates allowed!');
			return;
		}

		setFavoriteMovies(old => [...old, movie]);
	};

	const handleTopFiveClick = (event: SyntheticEvent, movie: IMovie) => {
		const newFavoriteMovies: IMovie[] = favoriteMovies.filter(
			({ id }) => id !== movie.id
		);

		setFavoriteMovies(old => [...newFavoriteMovies]);
	};

	const handleSaveClick = async () => {
		if (favoriteMovies.length < 5) {
			alert('must have 5 movies to save!');
			return;
		}

		const moviesToSave: IMovieFavoritesDto[] = favoriteMovies.map(
			(movie, index) => {
				return { movie_id: movie.id, rank: index + 1 };
			}
		);
		if (isNewUser) {
			const result = await postMovies(moviesToSave);
			console.log('results from first save!', result);
			if (result.error !== undefined) {
				alert('something went wrong with the request!');
				return;
			}

			setIsNewUser(false);
		} else {
			const result = await putMovies(moviesToSave);
			if (typeof result.error === undefined) {
				console.error('Error with put: ', result.error);
			}
			//TODO add message banner at top of screen on success
			console.log('movies saved successfully');
		}
	};

	useEffect(() => {
		const setUpUser = async () => {
			try {
				const user = await getCurrentUser();
				if (user.error !== undefined) {
					console.log(user.error);
				}

				// setUser(user.email);
				// setUserId(user.id);
				const userFavorites = await getUserFavorites();
				if (userFavorites.hasOwnProperty('message')) {
					console.log('we have a new user here');
					setFavoriteMovies(old => []);
					setIsNewUser(true);
				} else {
					const favoriteMovieList = await getUserFavorites();
					const favoriteMovieData = await getFavoriteMovieData(
						favoriteMovieList
					);
					if (typeof favoriteMovieData[0].error === undefined) {
						console.log('error retrieving data: ', favoriteMovieData[0].error);
					}
					setFavoriteMovies(old => [...favoriteMovieData]);
				}
			} catch (error) {
				let message = 'error with fetching user';
				if (error instanceof Error) message = `Error: ${error.message}`;
				console.log(message);
			}
		};

		const setUpPopularMovies = async () => {
			try {
				const returnedMovies = await getPopularMovieData();
				const newMovieList: IMovie[] = [...returnedMovies];
				setMovies(oldArr => [...newMovieList]);
			} catch (error) {
				let message = 'error with fetching movies';
				if (error instanceof Error) message = `Error: ${error.message}`;
				console.error(message);
			}
		};

		setUpUser();
		setUpPopularMovies();
	}, []);

	useEffect(() => {
		const handleMovieSearch = async () => {
			try {
				if (searchQuery.length <= 0) {
					setQueriedMovies(oldArr => []);
					return;
				}
				const returnedMovies = await getMovieQuery(searchQuery);
				const searchedMovieList: IMovie[] = [...returnedMovies];
				setQueriedMovies(oldArr => [...searchedMovieList]);
			} catch (error) {
				let message = 'error with searching for a movie';
				if (error instanceof Error) message = `Error: ${error.message}`;
				console.log(message);
			}
		};

		handleMovieSearch();
	}, [searchQuery]);

	return (
		<VStack mt={10} spacing={12} bg={background}>
			{/* Top 5 Movies area */}
			<VStack w='full' minH={80}>
				<HStack w='full' justify='space-between' px={7}>
					<div></div>
					<Text fontSize='4xl'>Your Top 5</Text>
					<Button colorScheme='green' size='sm' onClick={handleSaveClick}>
						Save Changes
					</Button>
				</HStack>
				<HStack w='100%' p={5} spacing={5}>
					{favoriteMovies.length > 0 &&
						favoriteMovies.map((movie, index) => {
							return (
								<MovieCard
									key={movie.id || index}
									movie={movie}
									handleMovieClick={handleTopFiveClick}
								/>
							);
						})}
				</HStack>
			</VStack>
			{/* Movies to choose from area */}
			<SimpleGrid columns={5} spacing={6} mt={6}>
				{queriedMovies.length > 0
					? queriedMovies.map((movie, index) => {
							return (
								<MovieCard
									key={movie.id || index}
									movie={movie}
									handleMovieClick={handleMovieClick}
								/>
							);
					  })
					: movies.map((movie, index) => {
							return (
								<MovieCard
									key={movie.id || index}
									movie={movie}
									handleMovieClick={handleMovieClick}
								/>
							);
					  })}
			</SimpleGrid>
		</VStack>
	);
};

export default HomePage;
