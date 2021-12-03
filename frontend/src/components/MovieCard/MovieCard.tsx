import { Box, Flex, VStack } from '@chakra-ui/layout';
import { Text, Image } from '@chakra-ui/react';
import { SyntheticEvent } from 'react';
import { IMovie } from '../HomePage/models/IMovie.model';

const MovieCard = ({
	movie,
	handleMovieClick,
}: {
	movie: IMovie;
	handleMovieClick: any;
}) => {
	return (
		<Box
			h='500px'
			w='300px'
			boxShadow='2xl'
			rounded='md'
			bg='gray.800'
			onClick={(event: SyntheticEvent) => handleMovieClick(event, movie)}
		>
			<Flex
				maxH='278px'
				w='100%'
				bg='gray.800'
				justify='center'
				align='center'
				rounded='md'
				my={3}
			>
				<Flex h='278px' w='185px' justify='center' align='center' rounded='md'>
					<Image
						// src={movie.posterPath}
						src='http://image.tmdb.org/t/p/w185/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg'
						alt={`Poster for ${movie.title}`}
						objectFit='scale-down'
						borderRadius='lg'
						boxSize='278px'
					/>
				</Flex>
			</Flex>
			<VStack
				align='flex-start'
				textColor='white'
				p={3}
				boxShadow='0 -5px 10px -5px #1A202C'
			>
				<Text fontSize='lg' fontWeight='bold' noOfLines={2}>
					{movie.title}
				</Text>
				<Text fontSize='md'>Summary</Text>
				<Text fontSize='sm' noOfLines={4}>
					{movie.overview}
				</Text>
			</VStack>
		</Box>
	);
};

export default MovieCard;
