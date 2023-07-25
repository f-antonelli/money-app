import { ExpenseCreateDto, ExpenseSearchDto } from '../../../dtos/expenses.dto';
import { Expense } from '../../../models/Expense';
import { ExpensesRepository } from '../../expenses.repository';

export class ExpensesPostgreSQLRepository implements ExpensesRepository {
  async find(entry: ExpenseSearchDto): Promise<Expense | null> {
    const result = await Expense.findOne({
      where: { userid: entry.userid, expense_id: entry.expense_id },
    });

    if (!result) return null;

    return result;
  }

  async all(id: string): Promise<Expense[]> {
    const result = await Expense.find({ where: { userid: id } });

    return result;
  }

  async store(entry: ExpenseCreateDto): Promise<void> {
    const result = Expense.create(entry);
    await result.save();
  }

  update(entry: Expense): Promise<void> {
    throw new Error('Method not implemented.');
  }
  remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
