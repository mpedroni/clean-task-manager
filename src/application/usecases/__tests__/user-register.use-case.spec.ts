import {
  InvalidEmailError,
  InvalidNameError,
  InvalidUsernameError,
  User,
} from '@entities/user.entity';
import { UserCreateDTO, UserRepository } from '@repositories/user.repository';
import { RegisterUserUseCase } from '../user-register.use-case';

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

  it('should not be able to register with an invalid email', async () => {
    const { sut } = makeSut();
    const userWithInvalidEmail = {
      email: 'invalid_email',
      name: 'John Doe',
      username: 'john.doe',
    };

    await expect(sut.execute(userWithInvalidEmail)).rejects.toThrowError(
      InvalidEmailError,
    );
  });

  it('should throw an error if the username is empty', async () => {
    const { sut } = makeSut();
    const userWithInvalidUsername = {
      email: 'john.doe@email.com',
      name: 'John Doe',
      username: '',
    };

    await expect(sut.execute(userWithInvalidUsername)).rejects.toThrowError(
      InvalidUsernameError,
    );
  });

  it('should throw an error if the username has less than 3 characters', async () => {
    const { sut } = makeSut();
    const userWithInvalidUsername = {
      email: 'john.doe@email.com',
      name: 'John Doe',
      username: '12',
    };

    await expect(sut.execute(userWithInvalidUsername)).rejects.toThrowError(
      InvalidUsernameError,
    );
  });

  it('should throw an error if the name is empty', async () => {
    const { sut } = makeSut();
    const userWithInvalidName = {
      email: 'john.doe@email.com',
      name: '',
      username: 'john.doe',
    };

    await expect(sut.execute(userWithInvalidName)).rejects.toThrowError(
      InvalidNameError,
    );
  });
});
