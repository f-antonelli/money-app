import { UserCreateDto } from '../dtos/user.dto';

export interface AuthRepository {
  create(data: UserCreateDto): Promise<void>;
}
