import { CategoryType } from '../enums/Categories';
import { ExpenseType } from '../enums/Expenses';

export interface ExpenseCreateDto {
  name: string;
  amount: number;
  type: ExpenseType;
  category_id: CategoryType;
}
