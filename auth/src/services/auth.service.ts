import { UserCreateDto } from '../dtos/user.dto';
import { AuthRepository } from '../repositories/auth.repository';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public async findById(id: string) {
    return await this.authRepository.find(id);
  }

  public async findByEmail(email: string) {
    return await this.authRepository.findByEmail(email);
  }

  public async create(data: UserCreateDto) {
    const result = await this.authRepository.create(data);

    if (result) delete result['password'];

    return result;
  }
}
