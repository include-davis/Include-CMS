import { auth_expiration } from '@settings/configs';
import jwt, { Secret } from 'jsonwebtoken';
import type { AuthToken } from '@typeDefs/auth/AuthToken';

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
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as AuthToken;
    return { ok: true, body: decodedToken, error: null };
  } catch (e) {
    return { ok: false, body: null, error: e };
  }
}
