import express from 'express';
import cors from 'cors';
import Container from './container';
import { errorHandler } from '../middleware/error-handler';
import { NotFoundError } from '../utils/not-found';
import { loadControllers } from 'awilix-express';
import cookieSession from 'cookie-session';

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

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
