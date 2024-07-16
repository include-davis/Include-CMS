'use server';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { DuplicateError, HttpError } from '@utils/response/Errors';
import { GetUserByEmail } from '@datalib/users/getUser';
import { CreateUser } from '@datalib/users/createUser';
import { createAuthToken } from '@utils/auth/authTokenHandlers';
import type { UserCredentials } from '@typeDefs/UserCredentials';

/**
 * @param body - { email: string, password: string }
 * @returns: {
 *   ok: boolean,
 *   body: AuthToken | null,
 *   error: number | null
 * }
 */
export async function Register(body: UserCredentials) {
  try {
    const { email, password } = body;

    // check if user exists
    const userRes = await GetUserByEmail(email);
    const user = await userRes.json();

    if (!user.ok || user.body) {
      throw new DuplicateError('User already exists.');
    }

    // hash the user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUserRes = await CreateUser({ email, password: hashedPassword });
    const newUser = await newUserRes.json();

    if (!newUser.ok) {
      throw new HttpError('Failed to create user.');
    }

    // create auth token for user
    const authToken = await createAuthToken(newUser.body);

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
