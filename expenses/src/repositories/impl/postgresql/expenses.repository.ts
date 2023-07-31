import {
  ExpenseSearchDto,
} from '../../../dtos/expenses.dto';
import { Expense } from '../../../models/Expense';
import { ExpensesRepository } from '../../expenses.repository';

export class ExpensesPostgreSQLRepository implements ExpensesRepository {
  async find(entry: ExpenseSearchDto): Promise<Expense | null> {
    const result = await Expense.createQueryBuilder('expenses')
      .leftJoinAndSelect('expenses.type', 'type')
      .where('user_id = :user_id', { user_id: entry.user_id })
      .andWhere('expense_id = :expense_id', { expense_id: entry.expense_id })
      .getOne();

    if (!result) return null;

    return result;
  }

  async all(id: string): Promise<Expense[]> {
    return await Expense.createQueryBuilder('expenses')
      .leftJoinAndSelect('expenses.type', 'type')
      .where('user_id = :user_id', { user_id: id })
      .getMany();
  }

  async store(entry: Partial<Expense>): Promise<void> {
    await Expense.createQueryBuilder('expenses')
      .insert()
      .into(Expense)
      .values(entry)
      .execute();
  }

  async update(entry: Partial<Expense>): Promise<void> {
    await Expense.createQueryBuilder()
      .update(Expense)
      .set({ name: entry.name, amount: entry.amount, type: entry.type })
      .where('user_id = :user_id', { user_id: entry.user_id })
      .execute();
  }

  async remove(entry: ExpenseSearchDto): Promise<void> {
    await Expense.createQueryBuilder('expenses')
      .delete()
      .from(Expense)
      .where('user_id = :user_id', { user_id: entry.user_id })
      .andWhere('expense_id = :expense_id', { expense_id: entry.expense_id })
      .execute();
  }
}
