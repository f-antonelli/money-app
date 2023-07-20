import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/custom-error';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err instanceof ZodError) {
    const message = err.errors.map((a) => ({ message: a.message }));

    return res.status(422).send({ errors: message });
  }

  console.error(err);
  res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};
