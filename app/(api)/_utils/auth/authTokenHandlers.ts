import { auth_expiration } from '@apidata/configs';
import jwt, { Secret } from 'jsonwebtoken';
import { NotAuthenticatedError } from '@utils/response/Errors';
import { AuthTokenInt } from '@datatypes/authToken';

/**
 * Create a JWT token with the given data
 * @param data - Data to be encoded in the token
 * @returns string - JWT token
 */
export async function createAuthToken(data: object) {
  return jwt.sign(data, process.env.JWT_SECRET as Secret, {
    expiresIn: `${auth_expiration}h`,
  });
}

/**
 *   Verifies the token provided by the user & returns the decoded payload if not expired
 *   @param token - string
 *   @returns: {
 *     ok: boolean,
 *     body: object | null,
 *     error: string | null
 *   }
 */
export async function verifyAuthToken(token: string) {
  const decodedPayload = jwt.verify(
    token,
    process.env.JWT_SECRET as Secret
  ) as AuthTokenInt;

  if (!decodedPayload) {
    throw new NotAuthenticatedError('Unauthorized. Invalid token.');
  }

  // check if token has expired
  const now = Math.floor(Date.now() / 1000);
  if (decodedPayload.exp && decodedPayload.exp < now) {
    throw new NotAuthenticatedError('Token has expired.');
  }

  return decodedPayload;
}
