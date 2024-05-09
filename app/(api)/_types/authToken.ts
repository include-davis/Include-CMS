interface AuthTokenInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  exp: number;
}

export default AuthTokenInterface;
