import { ExpenseCreateDto, ExpenseSearchDto } from '../dtos/expenses.dto';
import { Expense } from '../models/Expense';
import { ExpensesRepository } from '../repositories/expenses.repository';

export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  public async store(entry: ExpenseCreateDto): Promise<void> {
    await this.expensesRepository.store(entry);
  }

  public async all(userId: string): Promise<Expense[]> {
    return await this.expensesRepository.all(userId);
  }

  public async find(entry: ExpenseSearchDto): Promise<Expense | null> {
    return await this.expensesRepository.find(entry);
  }
}
