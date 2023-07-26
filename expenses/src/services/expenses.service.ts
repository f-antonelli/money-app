import { ExpenseCreateDto, ExpenseSearchDto, ExpenseUpdateDto } from '../dtos/expenses.dto';
import { Expense } from '../models/Expense';
import { ExpensesRepository } from '../repositories/expenses.repository';

export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  public async store(entry: ExpenseCreateDto): Promise<void> {
    await this.expensesRepository.store(entry);
  }

  public async all(userId: string) {
    return await this.expensesRepository.all(userId);
  }

  public async find(entry: ExpenseSearchDto): Promise<Expense | null> {
    return await this.expensesRepository.find(entry);
  }

  public async update(entry: ExpenseUpdateDto): Promise<void> {
    return await this.expensesRepository.update(entry);
  }

  public async remove(entry: ExpenseSearchDto): Promise<void> {
    await this.expensesRepository.remove(entry);
  }
}
