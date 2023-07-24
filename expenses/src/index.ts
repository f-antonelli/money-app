import { DatabaseConnectionError } from '@money-app/common';
import { app } from './helpers/app';
import { PostgresDataSource } from './helpers/db-connection';

const start = () => {
  if (!process.env.NODE_ENV) throw new Error('NODE_ENV must be defined');

  PostgresDataSource.initialize()
    .then(() => {
      console.log('Connected to PostgreSQL');
    })
    .catch((err: Error) => {
      console.error('Error during Data Source initialization', err);
      
      throw new DatabaseConnectionError();
    })
    .finally(() =>
      app.listen(3001, () => {
        console.log('Application is running on port 3001.');
      })
    );
};

start();
