'use server';
import bcrypt from 'bcryptjs';
import { DuplicateError, HttpError } from '@utils/response/Errors';
import { findUserByEmail } from '@datalib/users/findUser';
import { createUser } from '@datalib/users/createUser';
import { createAuthToken } from '@utils/auth/authTokenHandlers';
import type UserCredentials from '@typeDefs/auth/UserCredentials';
import User from '@typeDefs/auth/User';

/**
 * @param body - { email: string, password: string }
 * @returns: {
 *   ok: boolean,
 *   body: string (Auth Token) | null,
 *   error: number | null
 * }
 */
export async function register(body: UserCredentials) {
  try {
    const { email, password } = body;

    // check if user exists
    const userRes = await findUserByEmail(email);

    if (userRes.body) {
      throw new DuplicateError(
        'User already exists. Please enter a different email.'
      );
    }

    // hash the user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUserRes = await createUser({ email, password: hashedPassword });

    if (!newUserRes.ok) {
      throw new HttpError(`Failed to create user: ${newUserRes.error}`);
    }

    // create auth token for user
    const authToken = await createAuthToken(newUserRes.body as User);

    return { ok: true, body: authToken, error: null };
  } catch (e) {
    const error = e as HttpError;
    return { ok: false, body: null, error: error.message };
  }
}
