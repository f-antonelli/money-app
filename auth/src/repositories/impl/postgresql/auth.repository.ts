import { User } from '../../../models/User';
import { AuthRepository } from '../../auth.repository';

export class AuthPostgreSQLRepository implements AuthRepository {
  public async find(id: string): Promise<User | null> {
    const result = await User.findOneBy({ user_id: id });

    if (!result) return null;

    return result;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const result = await User.findOneBy({ email });

    if (!result) return null;

    return result;
  }

  public async create(values: User): Promise<User | null> {
    const result = User.create(values);
    await result.save();

    if (!result) return null;

    return result;
  }
}
