import jwt from 'jsonwebtoken';

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
