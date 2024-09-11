export default interface DecodedTokenInt {
  userId: string;
  exp: number;
}

export default interface AuthTokenInt {
  _id: string;
  email: string;
  password: string;
  iat: number;
  exp: number;
}
