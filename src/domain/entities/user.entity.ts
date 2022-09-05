type UserProps = {
  id?: string;
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

export class InvalidUsernameError extends Error {
  constructor(message: string = 'Invalid username') {
    super(message);
    this.name = 'InvalidUsernameError';
  }
}

export class InvalidNameError extends Error {
  constructor(message: string = 'Invalid name') {
    super(message);
    this.name = 'InvalidNameError';
  }
}

export class User {
  private props: UserProps;

  constructor({ id = '', name, username, email }: UserProps) {
    this.props = {
      id,
    } as UserProps;
    this.name = name;
    this.username = username;
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
    return this.props.id as string;
  }

  private set id(id: string) {
    this.props.id = id || '';
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    if (!name.trim())
      throw new InvalidNameError("The user name could't be empty.");

    this.props.name = name;
  }

  get username(): string {
    return this.props.username;
  }

  set username(username: string) {
    if (!username.trim())
      throw new InvalidUsernameError("The username couldn't be empty.");

    if (username.length < 3)
      throw new InvalidUsernameError(
        'The username must have at least 3 characters.',
      );

    this.props.username = username;
  }

  private isValidEmail(v: string) {
    let regex = new RegExp(/^(.+)@(.+)$/);
    return regex.test(v);
  }
}
