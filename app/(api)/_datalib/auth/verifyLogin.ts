import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

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

export async function verifyLogin(email: string, password: string) {
  try {
    // If unsuccessful login of user or password, return AuthenticationError.
    // getUserByEmail TO BE IMPLEMENTED.
    const user = await getUserByEmail(email);
    if (!user) {
      return { ok: false, error: 'AuthenticationError' };
    }
    const isMatch = await comparePasswordHash(password, user.passwordHash);
    if (!isMatch) {
      return { ok: false, error: 'AuthenticationError' };
    }

    // If successful login, generate token.
    const secretKey: Secret = process.env.JWT_SECRET_KEY || 'secret_key';
    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
      expiresIn: '24h',
    });
    return { ok: true, data: token };
  } catch (error) {
    console.error('Error during login:', error);
    return { ok: false, error: 'Internal server error' };
  }
}
