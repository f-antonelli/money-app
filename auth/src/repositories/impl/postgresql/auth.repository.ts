import { User } from '../../../models/User';
import { AuthRepository } from '../../auth.repository';

export class AuthPostgreSQLRepository implements AuthRepository {
  public async signin(): Promise<User> {
    return new User();
  }

  public async signup(): Promise<User> {
    return new User();
  }

  public async loguot(): Promise<void> {}
}
