import { Expense } from '../models/Expense';

export interface ExpenseRepository {
  find(id: number): Promise<Expense | null>;
  all(): Promise<Expense[]>;
  store(entry: Expense): Promise<void>;
  update(entry: Expense): Promise<void>;
  remove(id: number): Promise<void>;
}
