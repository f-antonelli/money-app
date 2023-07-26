import {
  ExpenseCreateDto,
  ExpenseSearchDto,
  ExpenseUpdateDto,
} from '../dtos/expenses.dto';
import { Expense } from '../models/Expense';

export interface ExpensesRepository {
  find(entry: ExpenseSearchDto): Promise<Expense | null>;
  all(id: string): Promise<Expense[]>;
  store(entry: ExpenseCreateDto): Promise<void>;
  update(entry: ExpenseUpdateDto): Promise<void>;
  remove(entry: ExpenseSearchDto): Promise<void>;
}
