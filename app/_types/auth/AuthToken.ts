export interface DecodedToken {
  userId: string;
  exp: number;
}

export interface AuthToken {
  _id: string;
  email: string;
  password: string;
  iat: number;
  exp: number;
}
