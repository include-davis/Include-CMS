export interface DecodedToken {
  userId: string;
  exp: number;
}

export interface AuthTokenInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  exp: number;
}
