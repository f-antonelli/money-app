import { ExpenseSearchDto } from '../dtos/expenses.dto';
import { Expense } from '../models/Expense';
import { ExpensesRepository } from '../repositories/expenses.repository';

export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) { }

  public async store(entry: Partial<Expense>): Promise<void> {
    await this.expensesRepository.store(entry);
  }

  public async all(userId: string) {
    const result = await this.expensesRepository.all(userId);

    return this.format(result);
  }

  public async find(entry: ExpenseSearchDto) {
    const result = await this.expensesRepository.find(entry);

    if (!result) return null;

    return this.format([result]);
  }

  public async update(entry: Partial<Expense>): Promise<void> {
    return await this.expensesRepository.update(entry);
  }

  public async remove(entry: ExpenseSearchDto): Promise<void> {
    await this.expensesRepository.remove(entry);
  }

  private format(entry: Expense[]) {
    return entry.map(expense => ({
      ...expense,
      type: expense.type.name,
    }));
  }
}
