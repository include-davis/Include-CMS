'use server';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { HttpError, NotAuthenticatedError } from '@utils/response/Errors';
import { GetUserByEmail } from '@datalib/users/getUser';
import { createAuthToken } from '@utils/auth/authTokenHandlers';
import type { User } from '@typeDefs/auth/user';
import type { UserCredentials } from '@typeDefs/auth/UserCredentials';

/**
 * @param body - { email: string, password: string }
 * @returns: {
 *   ok: boolean,
 *   body: string (Auth Token) | null,
 *   error: number | null
 * }
 */
export async function Login(body: UserCredentials) {
  try {
    const { email, password } = body;
    // get user
    const res = await GetUserByEmail(email);
    const data = await res.json();
    const user: User = data.body;

    if (!user) {
      throw new HttpError(data.error);
    }

    // check if password matches
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new NotAuthenticatedError('Invalid password. Please try again.');
    }

    // create auth token for user
    const authToken = await createAuthToken(user);

    return NextResponse.json(
      { ok: true, body: authToken, error: null },
      { status: 200 }
    );
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
}
