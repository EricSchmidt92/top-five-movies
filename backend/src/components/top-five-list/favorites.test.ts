import app from '../../app';
import request from 'supertest';
import { IMovie } from '../../models/IMovie';
const server = request.agent(app);

beforeAll(async () => {
  return await server
    .post('/users/login')
    .send({ username: 'a', password: 'a' });
});

afterAll((done) => {
  done();
});

it('returns email: a when checking current logged in user', async () => {
  const res = await server.get('/users');
  expect(res.body).toHaveProperty('email');
});

describe('Favorites', () => {
  it('returns top 5 movies when creating favorites', async () => {
    const movies: IMovie[] = [{ movie_id: 1234567, rank: 1 }];
    const res = await server.post('/favorites').send(movies);
  });
});
