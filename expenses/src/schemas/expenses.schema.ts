import { nativeEnum, number, object, string, TypeOf } from 'zod';
import { CategoryType } from '../enums/Categories';

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }).max(50, 'Username must be 50 characters maximum'),
    type: nativeEnum(CategoryType),
    amount: number({
      required_error: 'Amount is required',
    }),
  }),
};

export const createExpenseSchema = object({ ...payload });

export type createExpenseSchema = TypeOf<typeof createExpenseSchema>;
