type UserProps = {
  id: string;
  name: string;
  username: string;
  email: string;
};

export class InvalidEmailError extends Error {
  constructor() {
    super('Invalid email');
    this.name = 'InvalidEmailError';
  }
}

export class User {
  private props: UserProps;

  constructor({ id, name, username, email }: UserProps) {
    this.props = {
      id,
      name,
      username,
    } as UserProps;
    this.email = email;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    const isValidEmail = this.isValidEmail(email);
    if (!isValidEmail) throw new InvalidEmailError();
    this.props.email = email;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get username(): string {
    return this.props.username;
  }

  private isValidEmail(v: string) {
    let regex = new RegExp(/^(.+)@(.+)$/);
    return regex.test(v);
  }
}
