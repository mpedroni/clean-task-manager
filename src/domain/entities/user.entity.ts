type UserProps = {
  id: string;
  name: string;
  username: string;
  email: string;
};

export class User {
  public readonly id: string;
  public name: string;
  public username: string;
  public email: string;

  constructor({ id, name, username, email }: UserProps) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
  }
}
