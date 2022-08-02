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
  readonly id: string;
  name: string;
  username: string;
  private _email: string = '';

  constructor({ id, name, username, email }: UserProps) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    console.log({ email, valid: this.validateEmail(email) });
    const isValidEmail = this.validateEmail(email);
    if (!isValidEmail) throw new InvalidEmailError();
    this._email = email;
  }

  private validateEmail(v: string) {
    let regex = new RegExp(/^(.+)@(.+)$/);
    return regex.test(v);
  }
}
