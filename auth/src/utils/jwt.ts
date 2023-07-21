import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({
  path: `${__dirname}/../config/${process.env.NODE_ENV}.env`,
});

export function signJwt(
  object: Record<string, unknown>,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(object, process.env.SECRET_KEY!, {
    ...(options && options),
  });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, process.env.SECRET_KEY!);
}
