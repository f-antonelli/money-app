import express from 'express';
import cors from 'cors';
import Container from './container';

const app = express();

app.use(express.json());
app.use(cors());

Container(app);

export { app };
