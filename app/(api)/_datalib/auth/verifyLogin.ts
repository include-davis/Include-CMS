import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { NotAuthenticatedError, HttpError } from '@utils/response/Errors';

/**
 * Compares a provided password with a stored password hash.
 * @param providedPassword The password provided by the user.
 * @param storedHash The hash stored in the database.
 * @returns True if the password matches the hash, false otherwise.
 */
export async function comparePasswordHash(
  providedPassword: string,
  storedHash: string
): Promise<boolean> {
  return bcrypt.compare(providedPassword, storedHash);
}

/**
 * Retreives the user object based on email match.
 * @param email email provided by the user.
 * @returns user object.
 */
export async function getUserByEmail(email: string) {
  return email;
}

/**
 * Verifies the user's login credentials.
 * @param email email provided by the user.
 * @param password password provided by the user.
 * @returns Token if login is successful.
 */
export async function verifyLogin(email: string, password: string) {
  try {
    const key: Secret = process.env.JWT_SECRET_KEY || 'default_secret_key';

    // If unsuccessful login of user or password, return AuthenticationError.
    const user = await getUserByEmail(email);
    if (!user) {
      throw new NotAuthenticatedError('User not found');
    }

    const isMatch = await comparePasswordHash(password, key);
    if (!isMatch) {
      throw new NotAuthenticatedError('Passwords does not match');
    }

    // If successful login, generate token.
    const secretKey: Secret = process.env.JWT_SECRET_KEY || 'secret_key';
    const token = jwt.sign({ user, email }, secretKey, {
      expiresIn: '24h',
    });
    return { ok: true, data: token };
  } catch (error) {
    console.error('Error during login:', error);
    throw new HttpError('Not found');
  }
}
