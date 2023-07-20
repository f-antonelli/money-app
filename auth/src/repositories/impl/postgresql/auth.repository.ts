import { User } from '../../../models/User';
import { AuthRepository } from '../../auth.repository';

export class AuthPostgreSQLRepository implements AuthRepository {
  public async create(values: User): Promise<void> {
    const user = User.create(values);

    await user.save();
  }
}
