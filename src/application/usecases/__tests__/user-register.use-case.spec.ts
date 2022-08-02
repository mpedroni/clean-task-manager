import { User } from '@entities/user.entity';
import {
  UserCreateDTO,
  UserRepository,
} from '../../../domain/repositories/user.repository';
import { RegisterUserUseCase } from '../user-register.use-case';

class InMemoryUserRepository implements UserRepository {
  async create({ email, name, username }: UserCreateDTO): Promise<User> {
    const user = new User({ id: 'fake-user-id', email, name, username });
    return user;
  }
}

describe('UserRegisterUseCase', () => {
  it('should be able to register a user', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new RegisterUserUseCase(userRepository);
    const user = await sut.execute({
      name: 'John Doe',
      username: 'john.doe',
      email: 'john.doe@email.com',
    });
    expect(user.id).toBeTruthy();
  });
});
