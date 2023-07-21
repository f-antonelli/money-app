import request from 'supertest';
import { app } from '../helpers/app';

it('returns a 201 on successful signup', async () => {
  await request(app)
    .post('/api/v1/auth')
    .send({
      username: 'fede2',
      email: 'test2@test.com',
      password: '12356775',
      passwordConfirmation: '12356775'
    }).expect(201)

});

it('second testing', async () => {
  await request(app)
    .post('/api/v1/auth')
    .send({
      username: 'fede2',
      email: 'test2@test.com',
      password: '12356775',
      passwordConfirmation: '12356775'
    }).expect(201)
});