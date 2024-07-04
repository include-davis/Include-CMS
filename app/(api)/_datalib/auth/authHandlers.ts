import { auth_expiration } from '@apidata/configs';
import jwt, { Secret } from 'jsonwebtoken';
import { HttpError } from '@utils/response/Errors';
import { AuthTokenInt } from '@datatypes/authToken';

/*
 * Create a JWT token with the given data
 * @param {object} data - Data to be encoded in the token
 * @returns string - JWT token
 */
export async function createAuthToken(data: object) {
  return jwt.sign(data, process.env.JWT_SECRET as Secret, {
    expiresIn: `${auth_expiration}h`,
  });
}

/*
 *   Verifies the token provided by the user & returns the decoded payload if not expired
 *   @param token: string
 *   @returns {ok: boolean, body: object | null, error: string | null}
 */
export async function verifyAuthToken(token: string) {
  try {
    const decodedPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as AuthTokenInt;
    // is this even needed? verify throws error if invalid token
    // if (!decodedPayload) {
    //   throw new NotAuthenticatedError('Unauthorized. Invalid token.');
    // }

    // check if token has expired
    const now = Math.floor(Date.now() / 1000);
    if (decodedPayload.exp && decodedPayload.exp < now) {
      throw new HttpError('Token has expired');
    }

    return { ok: true, body: decodedPayload, error: null };
  } catch (e) {
    const error = e as HttpError;
    return { ok: false, body: null, error: error.message };
  }
}
