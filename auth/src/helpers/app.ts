import express from 'express';
import cors from 'cors';
import Container from './container';
import { errorHandler } from '../middleware/error-handler';
import { NotFoundError } from '../utils/not-found';
import { loadControllers } from 'awilix-express';

const app = express();

app.use(express.json());
app.use(cors());

Container(app);

app.use(loadControllers('controllers/*.ts', { cwd: `${__dirname}/../` }));

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
