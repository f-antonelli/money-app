import { CategoryCreateDto } from '../dtos/category.dto';
import { Category } from '../models/Category';

export interface CategoryRepository {
  all(): Promise<Category[]>;
  store(entry: CategoryCreateDto): Promise<void>;
}
