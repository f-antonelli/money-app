import { AuthRepository } from '../repositories/auth.repository';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
}
