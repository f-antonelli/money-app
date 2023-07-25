import { ExpenseCreateDto } from '../dtos/expenses.dto';
import { ExpensesRepository } from '../repositories/expenses.repository';

export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  public async store(entry: ExpenseCreateDto): Promise<void> {
    await this.expensesRepository.store(entry);
  }
}
