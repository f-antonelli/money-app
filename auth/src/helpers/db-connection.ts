import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../models/User';

dotenv.config({
  path: `${__dirname}/../config/${process.env.NODE_ENV}.env`,
});

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User],
});
