import { PostgresTestDataSource } from './db-connection';

beforeAll(async () => {
  await PostgresTestDataSource.initialize().catch((err) => console.log(err));
});

afterAll(async () => {
  await PostgresTestDataSource.destroy();
});

beforeEach(async () => {
  const entities = PostgresTestDataSource.entityMetadatas;

  entities.forEach(
    async (entity) =>
      await PostgresTestDataSource.getRepository(entity.name).clear()
  );
});
