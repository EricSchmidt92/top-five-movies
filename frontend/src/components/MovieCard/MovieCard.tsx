import { Box, Flex, VStack } from '@chakra-ui/layout';
import { Text, Image, useColorModeValue } from '@chakra-ui/react';
import { SyntheticEvent } from 'react';
import IMovie from '../HomePage/models/IMovie.model';

const MovieCard = ({
	movie,
	handleMovieClick,
}: {
	movie: IMovie;
	handleMovieClick: any;
}) => {
	const cardBackground = useColorModeValue('gray.100', 'gray.700');
	return (
		<Box
			h='500px'
			w='300px'
			boxShadow='lg'
			rounded='md'
			bg={cardBackground}
			onClick={(event: SyntheticEvent) => handleMovieClick(event, movie)}
		>
			<Flex
				maxH='278px'
				w='100%'
				bg={cardBackground}
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
			<VStack align='flex-start' p={3}>
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
