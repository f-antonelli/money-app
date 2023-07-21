import { UserCreateDto, UserLoginDto } from '../dtos/user.dto';
import { User } from '../models/User';
import { AuthRepository } from '../repositories/auth.repository';
import { signJwt } from '../utils/jwt';
import { Password } from '../utils/password';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public async findById(id: string) {
    return await this.authRepository.find(id);
  }

  public async findByEmail(email: string) {
    return await this.authRepository.findByEmail(email);
  }

  public async create(data: UserCreateDto) {
    await this.authRepository.create(data);
  }

  public async signIn(data: UserLoginDto) {
    const existingUser = await this.findByEmail(data.email);
    if (!existingUser) return null;
    
    const checkPassword = await Password.compare(
      existingUser.password,
      data.password
    );
    if (!checkPassword) return null;

    const token = signJwt({
      id: existingUser.user_id,
      email: existingUser.email,
    });

    return {
      token,
      user: {
        id: existingUser.user_id,
        email: existingUser.email,
        username: existingUser.username,
      },
    };
  }
}
