import { UserCreateDto } from '../dtos/user.dto';
import { User } from '../models/User';

export interface AuthRepository {
  find(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: UserCreateDto): Promise<Partial<User> | null>;
}
