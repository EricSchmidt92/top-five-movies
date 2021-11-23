import app from '../../app';
import request from 'supertest';
import { IMovie } from '../../models/IMovie';
import { query } from '../../db';

process.env.NODE_ENV = 'test';
const server = request.agent(app);

const movieData: IMovie[] = [
	{
		movie_id: 49018,
		rank: 1,
	},
	{
		movie_id: 49018,
		rank: 2,
	},
	{
		movie_id: 49018,
		rank: 3,
	},
	{
		movie_id: 49018,
		rank: 4,
	},
	{
		movie_id: 49018,
		rank: 5,
	},
];

const updatedMovies: IMovie[] = [
	{
		movie_id: 12345,
		rank: 1,
	},
	{
		movie_id: 54321,
		rank: 2,
	},
	{
		movie_id: 12345,
		rank: 3,
	},
	{
		movie_id: 54321,
		rank: 4,
	},
	{
		movie_id: 12345,
		rank: 5,
	},
];

beforeAll(async () => {
	await query('TRUNCATE users, user_favorites', []);

	await server
		.post('/users')
		.send({ firstName: 'a', lastName: 'a', password: 'a', email: 'a' });
	return await server
		.post('/users/login')
		.send({ username: 'a', password: 'a' });
});

beforeEach(async () => {
	await query('TRUNCATE user_favorites', []);
});

afterEach(async () => {
	return await server
		.post('/users/login')
		.send({ username: 'a', password: 'a' });
});

afterAll(done => {
	done();
});

it('returns email: a when checking current logged in user', async () => {
	const res = await server.get('/users');
	expect(res.body).toHaveProperty('email');
});

describe('Favorites create route', () => {
	it('returns a status code of 201 on success', async () => {
		const res = await server.post('/favorites').send({ movies: movieData });
		expect(res.statusCode).toBe(201);
	});

	it('returns array of movies on successful creation', async () => {
		const res = await server.post('/favorites').send({ movies: movieData });
		// console.log(res);
		expect(res.body).toEqual(movieData);
	});

	it('should return status code of 400 if no user is provided', async () => {
		await server.get('/users/logout');
		const res = await server.post('/favorites').send({ movies: movieData });
		expect(res.statusCode).toBe(400);
	});

	it('should return an appropriate message when no user provided', async () => {
		await server.get('/users/logout');
		const res = await server.post('/favorites').send({ movies: movieData });
		expect(res.body).toEqual({ message: 'No user logged in' });
	});

	it('should return status code of 400 if no movies are provided', async () => {
		const res = await server.post('/favorites');
		expect(res.statusCode).toBe(400);
	});

	it('should return appropriate message when no movies provided', async () => {
		const res = await server.post('/favorites');
		expect(res.body).toEqual({ message: 'No movies provided' });
	});
});

describe('Get Favorites route successful tests', () => {
	beforeEach(async () => {
		const res = await server.post('/favorites').send({ movies: movieData });
	});

	it('returns status code of 200 when successful', async () => {
		const res = await server.get('/favorites');
		expect(res.statusCode).toBe(200);
	});

	it('returns list of movies upon success', async () => {
		const res = await server.get('/favorites');
		// console.log('returns list:', res.body);
		expect(res.body).toEqual(movieData);
	});
});

//TODO FINISH THESE TESTS
describe('Get Favorites route handling errors', () => {
	// status code on error
	it('returns status code 400 on error', async () => {
		const res = await server.get('/favorites');
		expect(res.statusCode).toBe(400);
	});

	it('should return appropriate message if no user present', async () => {
		await server.get('/users/logout');
		const res = await server.get('/favorites');
		expect(res.body).toEqual({ message: 'No user found' });
	});

	it('should return appropriate message when no movies found', async () => {
		const res = await server.get('/favorites');
		expect(res.body).toEqual({ message: 'error fetching movies.' });
	});
});

describe('Update favorites route successful tests', () => {
	beforeEach(async () => {
		const res = await server.post('/favorites').send({ movies: movieData });
	});

	it('should return appropriate message on movie update', async () => {
		const res = await server.put('/favorites').send({ movies: updatedMovies });
		expect(res.body.message).toContain('Movie List has been updated:');
	});

	it('should return array of updated movies on success', async () => {
		const res = await server.put('/favorites').send({ movies: updatedMovies });
		expect(res.body.movies).toEqual(updatedMovies);
	});
});

describe('Update favorites route error handling', () => {
	it('should return status code 400 on error', async () => {
		const res = await server.put('/favorites');
		expect(res.statusCode).toBe(400);
	});

	it('should return appropriate error message when no user is logged in', async () => {
		await server.get('/users/logout');
		const res = await server.put('/favorites');
		expect(res.body.message).toBe('No user found');
	});

	it('should return appropriate error message when no list of movies provided', async () => {
		const res = await server.put('/favorites');
		expect(res.body.message).toBe('No list of movies provided');
	});
});
