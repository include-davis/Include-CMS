'use server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { HttpError, NotAuthenticatedError } from '@utils/response/Errors';
import { GetManyUsers } from '@datalib/users/getUser';
import { createAuthToken } from './createToken';

export async function Login(body: { email: string; password: string }) {
  try {
    const { email, password } = body;
    const res = await GetManyUsers({ email });
    const data = await res.json();

    if (!data.ok || !data.body.length) {
      throw new NotAuthenticatedError('User not found.');
    }

    const user = data.body[0];

    const isPasswordValid = await bcrypt.compare(
      password as string,
      user.password
    );

    if (!isPasswordValid) {
      throw new NotAuthenticatedError('Invalid password.');
    }

    const token = await createAuthToken(user);
    return NextResponse.json(
      { ok: true, body: token, error: null },
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
