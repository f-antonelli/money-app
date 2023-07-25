import request from 'supertest';
import { app } from '../helpers/app';

describe('POST /signup', () => {
  it('returns a 201 on successful signup', async () => {
    await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fede2',
        email: 'xxxx@test.com',
        password: '12356775',
        passwordConfirmation: '12356775',
      })
      .expect(201);
  });

  it('returns a 422 with an invalid email', async () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fede1',
        email: 'lz;xjdaslk',
        password: 'password',
        passwordConfirmation: 'password',
      })
      .expect(422);
  });

  it('returns a 422 with an invalid password', async () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fede1',
        email: 'test@test.com',
        password: '1',
        passwordConfirmation: '1',
      })
      .expect(422);
  });

  it('returns a 422 with missing email and password', async () => {
    await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fede1',
        password: 'password',
        passwordConfirmation: 'password',
      })
      .expect(422);

    await request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'fede1', email: 'test3@test.com' })
      .expect(422);
  });

  it('disallows duplicate emails', async () => {
    await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fede1',
        email: 'test3@test.com',
        password: 'password',
        passwordConfirmation: 'password',
      })
      .expect(201);

    await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'fede1',
        email: 'test3@test.com',
        password: 'password',
        passwordConfirmation: 'password',
      })
      .expect(400);
  });
});
