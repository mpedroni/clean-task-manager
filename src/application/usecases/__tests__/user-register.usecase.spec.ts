import { User } from '@entities/user.entity';
import { UserCreateDTO, UserRepository } from '@repositories/user.repository';
import {
  EmailAlreadyInUseError,
  RegisterUserUseCase,
} from '../user-register.usecase';

class InMemoryUserRepository implements UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    if (!user) throw new Error('User not found');
    return user;
  }
  async create({ email, name, username }: UserCreateDTO): Promise<User> {
    const user = new User({ id: 'fake-user-id', email, name, username });
    this.users.push(user);
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

  it('should throws an error if the given email is already in use', async () => {
    const { sut } = makeSut();
    const user = {
      name: 'John Doe',
      username: 'john.doe',
      email: 'john.doe@email.com',
    };

    await sut.execute(user);

    await expect(
      sut.execute({ ...user, username: 'another-username' }),
    ).rejects.toThrowError(EmailAlreadyInUseError);
  });
});
