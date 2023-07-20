import { UserCreateDto } from '../dtos/user.dto';
import { AuthRepository } from '../repositories/auth.repository';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public async create(data: UserCreateDto): Promise<void> {
    const result = await this.authRepository.create(data);

    return result;
  }
}
