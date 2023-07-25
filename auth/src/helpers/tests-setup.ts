import request from 'supertest';
import { PostgresTestDataSource } from './db-connection';
import { app } from './app';

declare global {
  // eslint-disable-next-line no-var
  var signin: () => Promise<string[]>;
}

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.SECRET_KEY = 'asdsa';
  await PostgresTestDataSource.initialize();
});

afterAll(async () => {
  await PostgresTestDataSource.destroy();
});

beforeEach(async () => {
  const entities = PostgresTestDataSource.entityMetadatas;

  entities.forEach(
    async (entity) =>
      await PostgresTestDataSource.getRepository(entity.name)
        .createQueryBuilder()
        .softDelete()
  );
});

global.signin = async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      username: 'messi',
      email: 'test@test.com',
      password: '12356775',
      passwordConfirmation: '12356775',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'test@test.com',
      password: '12356775',
    })
    .expect(200);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
