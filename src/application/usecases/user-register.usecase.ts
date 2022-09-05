import { UserRepository } from '../../domain/repositories/user.repository';

type RegisterUserUseCaseInput = {
  name: string;
  username: string;
  email: string;
};

type RegisterUserUseCaseOutput = RegisterUserUseCaseInput & { id: string };

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(
    input: RegisterUserUseCaseInput,
  ): Promise<RegisterUserUseCaseOutput> {
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
}
