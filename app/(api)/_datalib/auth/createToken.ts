import { auth_expiration } from '@apidata/configs';
import jwt, { Secret } from 'jsonwebtoken';

export async function createAuthtoken(data: object) {
  return jwt.sign(data, process.env.JWT_SECRET as Secret, {
    expiresIn: `${auth_expiration}h`,
  });
}
