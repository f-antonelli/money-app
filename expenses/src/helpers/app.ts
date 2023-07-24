import express from 'express';
import cors from 'cors';
import Container from './container';
import { loadControllers } from 'awilix-express';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@money-app/common';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cors());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

Container(app);

app.use(loadControllers('controllers/*.ts', { cwd: `${__dirname}/../` }));
app.get('/api/v1/expenses/test', (req, res) => {
  res.send('hola');
});
app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
