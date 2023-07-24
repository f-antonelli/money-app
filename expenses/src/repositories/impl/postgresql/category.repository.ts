import { CategoryCreateDto } from '../../../dtos/category.dto';
import { Category } from '../../../models/Category';
import { CategoryRepository } from '../../category.repository';

export class CategoryPostgreSQLRepository implements CategoryRepository {
  async all(): Promise<Category[]> {
    const result = await Category.find();

    return result;
  }

  async store(entry: CategoryCreateDto): Promise<void> {
    const result = Category.create({ ...entry });
    await result.save();
  }
}
