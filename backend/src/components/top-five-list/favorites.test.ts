import app from '../../app';
import request from 'supertest';
const server = request.agent(app);

beforeAll(async () => {
  const firstRes = await server
    .post('/users/login')
    .send({ username: 'a', password: 'a' });
});

it('returns email: a when checking current logged in user', async () => {
  const res = await server.get('/users');

  expect(res.body).toHaveProperty('email');
});

it('is testing', () => {});
