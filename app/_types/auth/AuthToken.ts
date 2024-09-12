import User from './User';

export interface AuthToken extends User {
  iat: number;
  exp: number;
}
