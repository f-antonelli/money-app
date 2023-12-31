import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt';

export {};

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) return next();

  try {
    const payload = verifyJwt(req.session.jwt) as UserPayload;

    req.currentUser = payload;
  } catch (err) {
    next(err);
  }

  next();
};