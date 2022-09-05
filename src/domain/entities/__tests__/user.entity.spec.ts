import {
  InvalidEmailError,
  InvalidNameError,
  InvalidUsernameError,
  User,
} from '@entities/user.entity';

describe('User entity', () => {
  it('should not be able to register with an invalid email', () => {
    const userWithInvalidEmail = {
      id: '',
      email: 'invalid_email',
      name: 'John Doe',
      username: 'john.doe',
    };

    expect(() => {
      new User(userWithInvalidEmail);
    }).toThrowError(InvalidEmailError);
  });

  it('should throw an error if the username is empty', () => {
    const userWithInvalidUsername = {
      id: '',
      email: 'john.doe@email.com',
      name: 'John Doe',
      username: '',
    };

    expect(() => {
      new User(userWithInvalidUsername);
    }).toThrowError(InvalidUsernameError);
  });

  it('should throw an error if the username has less than 3 characters', async () => {
    const userWithInvalidUsername = {
      id: '',
      email: 'john.doe@email.com',
      name: 'John Doe',
      username: '12',
    };

    expect(() => {
      new User(userWithInvalidUsername);
    }).toThrowError(InvalidUsernameError);
  });

  it('should throw an error if the name is empty', async () => {
    const userWithInvalidName = {
      id: '',
      email: 'john.doe@email.com',
      name: '',
      username: 'john.doe',
    };

    expect(() => {
      new User(userWithInvalidName);
    }).toThrowError(InvalidNameError);
  });
});
