import { UserRepository } from '../../domain/repositories/user.repository';

type RegisterUserUseCaseInput = {
  name: string;
  username: string;
  email: string;
};

type RegisterUserUseCaseOutput = RegisterUserUseCaseInput & { id: string };

export class EmailAlreadyInUseError extends Error {
  constructor(email: string) {
    super(`The email ${email} is already in use.`);
    this.name = 'EmailAlreadyInUseError';
  }
}

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(
    input: RegisterUserUseCaseInput,
  ): Promise<RegisterUserUseCaseOutput> {
    const isEmailAlreadyInUse = await this.isEmailAlreadyInUse(input.email);
    if (isEmailAlreadyInUse) throw new EmailAlreadyInUseError(input.email);

    const { id, email, name, username } = await this.userRepository.create(
      input,
    );
    return {
      id,
      email,
      name,
      username,
    };
  }

  private async isEmailAlreadyInUse(email: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findByEmail(email);
      return !!user;
    } catch {
      return false;
    }
  }
}
