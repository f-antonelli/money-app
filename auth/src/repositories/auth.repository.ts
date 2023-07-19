import { User } from '../models/User';

export interface AuthRepository {
  signup(): Promise<User>;
  signin(): Promise<User>;
  loguot(): Promise<void>;
}
