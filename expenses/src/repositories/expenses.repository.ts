import {
  ExpenseCreateDto,
  ExpenseSearchDto,
  ExpenseUpdateDto,
} from '../dtos/expenses.dto';
import { Expense } from '../models/Expense';

export interface ExpensesRepository {
  find(entry: ExpenseSearchDto): Promise<Expense | null>;
  all(id: string): Promise<Expense[]>;
  store(entry: Partial<Expense>): Promise<void>;
  update(entry: Partial<Expense>): Promise<void>;
  remove(entry: ExpenseSearchDto): Promise<void>;
}
