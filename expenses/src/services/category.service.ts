import { categoryData } from '../enums/Categories';
import { Category } from '../models/Category';
import { CategoryRepository } from '../repositories/category.repository';

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async all(): Promise<Category[]> {
    return await this.categoryRepository.all();
  }

  public async store(): Promise<void> {
    for (const category of categoryData) {
      await this.categoryRepository.store(category);
    }
  }
}
