import { User } from '../entities/user.entity';

export type UserCreateDTO = {
  email: string;
  name: string;
  username: string;
};

export interface UserRepository {
  create(data: UserCreateDTO): Promise<User>;
}
