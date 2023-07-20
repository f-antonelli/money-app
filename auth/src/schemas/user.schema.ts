import { object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    username: string({
      required_error: 'Username is required',
    }).max(15, 'Username must be 15 characters maximum'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    passwordConfirmation: string({
      required_error: 'passwordConfirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
};

export const createUserSchema = object({ ...payload });

export type createUserSchema = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>;