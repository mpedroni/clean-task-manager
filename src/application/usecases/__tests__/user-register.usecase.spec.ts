import { User } from '@entities/user.entity';
import { UserCreateDTO, UserRepository } from '@repositories/user.repository';
import { RegisterUserUseCase } from '../user-register.usecase';

class InMemoryUserRepository implements UserRepository {
  async create({ email, name, username }: UserCreateDTO): Promise<User> {
    const user = new User({ id: 'fake-user-id', email, name, username });
    return user;
  }
}

function makeSut() {
  const userRepository = new InMemoryUserRepository();
  const sut = new RegisterUserUseCase(userRepository);

  return {
    sut,
    userRepository,
  };
}

describe('UserRegisterUseCase', () => {
  it('should be able to register a user', async () => {
    const { sut } = makeSut();
    const user = await sut.execute({
      name: 'John Doe',
      username: 'john.doe',
      email: 'john.doe@email.com',
    });
    expect(user.id).toBeTruthy();
  });
});
