'use server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { HttpError, NotAuthenticatedError } from '@utils/response/Errors';
import { GetUserByEmail } from '@datalib/users/getUser';
import { createAuthToken } from '@utils/auth/authTokenHandlers';

interface LoginInt {
  email: string;
  password: string;
}

export async function Login(body: LoginInt) {
  try {
    const { email, password } = body;
    // get user
    const res = await GetUserByEmail(email);
    const data = await res.json();
    const user = data.body;

    // check if password matches
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new NotAuthenticatedError('Invalid email or password.');
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
