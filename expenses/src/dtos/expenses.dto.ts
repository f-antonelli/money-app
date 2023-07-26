import { CategoryType } from '../enums/Categories';

export interface ExpenseCreateDto {
  name: string;
  amount: number;
  type: CategoryType;
  user_id: string;
}

export interface ExpenseUpdateDto {
  name: string;
  amount: number;
  type: CategoryType;
  user_id: string;
  expense_id: string;
}

export interface ExpenseSearchDto {
  expense_id: string;
  user_id: string;
}
