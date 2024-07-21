export interface DecodedTokenInt {
  userId: string;
  exp: number;
}

export interface AuthTokenInt {
  _id: string;
  email: string;
  password: string;
  iat: number;
  exp: number;
}
