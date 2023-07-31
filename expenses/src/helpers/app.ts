import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import Container from './container';
import swaggerDocs from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { loadControllers } from 'awilix-express';
import { SwaggerOptions } from './swagger-config';
import { currentUser, errorHandler, NotFoundError } from '@money-app/common';

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

app.use(currentUser);

// HEALTH-CHECK
app.get('/api/v1/expenses/healthcheck', (_, res) => {
  res.send({ message: 'API running :)' });
});

//  SWAGGER
app.use('/api/v1/expenses/docs', serve, setup(swaggerDocs(SwaggerOptions)));

Container(app);

app.use(loadControllers('controllers/*.ts', { cwd: `${__dirname}/../` }));

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
