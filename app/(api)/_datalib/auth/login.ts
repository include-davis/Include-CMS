'use server';
import bcrypt from 'bcryptjs';
import { HttpError, NotAuthenticatedError } from '@utils/response/Errors';
import { findUserByEmail } from '@datalib/users/findUser';
import { createAuthToken } from '@utils/auth/authTokenHandlers';
import type UserCredentials from '@typeDefs/auth/UserCredentials';

/**
 * @param body - { email: string, password: string }
 * @returns: {
 *   ok: boolean,
 *   body: string (Auth Token) | null,
 *   error: number | null
 * }
 */
export async function login(body: UserCredentials) {
  try {
    const { email, password } = body;
    // get user
    const foundUser = await findUserByEmail(email);

    if (!foundUser.ok) {
      throw new HttpError(foundUser.error || '');
    }

    // check if password matches
    const passwordMatches = await bcrypt.compare(
      password,
      foundUser.body?.password || ''
    );

    if (!passwordMatches) {
      throw new NotAuthenticatedError('Incorrect email or password.');
    }

    // create auth token for user
    const authToken = await createAuthToken(foundUser.body || {});

    return { ok: true, body: authToken, error: null };
  } catch (e) {
    const error = e as HttpError;
    return { ok: false, body: null, error: error.message };
  }
}
