import { ExpenseCreateDto } from '../dtos/expenses.dto';
import { Expense } from '../models/Expense';

export interface ExpensesRepository {
  find(id: number): Promise<Expense | null>;
  all(id: string): Promise<Expense[]>;
  store(entry: ExpenseCreateDto): Promise<void>;
  update(entry: Expense): Promise<void>;
  remove(id: number): Promise<void>;
}
