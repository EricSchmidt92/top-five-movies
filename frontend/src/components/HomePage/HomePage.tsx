import { HStack, SimpleGrid, VStack } from '@chakra-ui/layout';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import getCurrentUser from './utils/getCurrentUser';
import { HomePageContext } from '../../contexts/HomePageContext';
import getMovieQuery from './utils/getMovieQuery';
import { IMovie } from './models/IMovie.model';
import MovieCard from '../MovieCard/MovieCard';
import { Text, Button } from '@chakra-ui/react';
import getUserFavorites from './utils/getUserFavorites';
import getPopularMovieData from './utils/getPopularMovieData';
import postMovies from './utils/postMovies';
import { IMovieFavoritesDto } from './models/IMovieFavoritesDto.model';
import getFavoriteMovieData from './utils/getFavoriteMovieData';

const HomePage = () => {
	// const history = useHistory();
	const [user, setUser] = useState('');
	const [userId, setUserId] = useState('');
	const [movies, setMovies] = useState<IMovie[]>([]);
	const [queriedMovies, setQueriedMovies] = useState<IMovie[]>([]);
	const [favoriteMovies, setFavoriteMovies] = useState<IMovie[]>([]);
	const [isNewUser, setIsNewUser] = useState(false);
	const { searchQuery }: any = useContext(HomePageContext);

	// const testRows = [];

	// for (let i = 0; i < 5; i++) {
	// 	testRows.push(
	// 		<Flex
	// 			key={i}
	// 			h='278px'
	// 			w='185px'
	// 			justify='center'
	// 			align='center'
	// 			rounded='md'
	// 		>
	// 			<Image
	// 				// src={movie.posterPath}
	// 				src='http://image.tmdb.org/t/p/w185/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg'
	// 				alt={`Poster for a top 5 movie`}
	// 				objectFit='scale-down'
	// 				borderRadius='lg'
	// 				boxSize='278px'
	// 			/>
	// 		</Flex>
	// 	);
	// }

	const setUpUser = async () => {
		try {
			const user = await getCurrentUser();
			if (user.error !== undefined) {
				console.log(user.error);
			}

			setUser(user.email);
			setUserId(user.id);
			// console.log('current user: ', user);
			const userFavorites = await getUserFavorites();
			if (userFavorites.hasOwnProperty('message')) {
				console.log('we have a new user here');
				setFavoriteMovies(old => []);
				setIsNewUser(true);
			} else {
				// console.log('returning user, fetching data...');
				const favoriteMovieList = await getUserFavorites();
				// console.log('favoriteMoviesList: ', favoriteMovieList);
				const favoriteMovieData = await getFavoriteMovieData(favoriteMovieList);
				console.log('favorite movie data', favoriteMovieData);
				if (favoriteMovieData[0].error === undefined) {
					console.log('error retrieving data: ', favoriteMovieData[0].error);
				}
				setFavoriteMovies(old => [...favoriteMovieData]);
				// console.log('user favs: ', userFavorites);
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
			console.log('pop movie list', newMovieList);
			setMovies(oldArr => [...newMovieList]);
		} catch (error) {
			let message = 'error with fetching movies';
			if (error instanceof Error) message = `Error: ${error.message}`;
			console.error(message);
		}
	};

	const handleMovieClick = (event: SyntheticEvent, movie: IMovie) => {
		if (favoriteMovies.length >= 5) {
			alert('only 5 movies allowed');
			return;
		}

		if (
			favoriteMovies.find(favorite => favorite.id === movie.id) !== undefined
		) {
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

		if (isNewUser) {
			const moviesToPost: IMovieFavoritesDto[] = favoriteMovies.map(
				(movie, index) => {
					return { movie_id: movie.id, rank: index + 1 };
				}
			);

			const result = await postMovies(moviesToPost);
			console.log('results from first save!', result);
			if (result.error !== undefined) {
				alert('something went wrong with the request!');
				return;
			}

			setIsNewUser(false);
		} else {
			alert('returning user must save other way');
		}
	};

	useEffect(() => {
		setUpUser();
		setUpPopularMovies();

		console.log('end of use effect', movies);
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
		<VStack>
			<VStack border='1px solid black' w='full' minH={80}>
				<HStack w='full' justify='space-between' px={2}>
					<div></div>
					<Text fontSize='4xl'>Your Top 5</Text>
					<Button
						colorScheme='green'
						size='sm'
						variant='outline'
						onClick={handleSaveClick}
					>
						Save Changes
					</Button>
				</HStack>
				<HStack w='100%' p={5} justify='space-evenly'>
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

				{/* {movies.map((movie, index) => {
					return (
						<MovieCard
							key={movie.id}
							movie={movie}
							handleMovieClick={handleMovieClick}
						/>
					);
				})} */}
			</SimpleGrid>
		</VStack>
	);
};

export default HomePage;
