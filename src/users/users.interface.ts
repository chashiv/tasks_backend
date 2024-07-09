export interface ISignUpUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export enum UsersError {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  PASSWORD_IS_INCORRECT = 'PASSWORD_IS_INCORRECT',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
}
