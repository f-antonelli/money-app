import { object, string, TypeOf } from 'zod';

function commonInputs() {
  return {
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
  };
}

const payload = {
  body: object({
    ...commonInputs(),
    username: string({
      required_error: 'Username is required',
    }).max(15, 'Username must be 15 characters maximum'),
    passwordConfirmation: string({
      required_error: 'passwordConfirmation is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
};

export const createUserSchema = object({ ...payload });
export const loginUserSchema = object({
  body: object({
    ...commonInputs(),
  }),
});

export type createUserSchema = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>;
export type loginUserSchema = TypeOf<typeof loginUserSchema>;
