import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
  path: `${__dirname}/../config/${process.env.NODE_ENV}.env`,
});

console.log(process.env.DB_HOST);
export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [],
});
