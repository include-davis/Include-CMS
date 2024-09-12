'use server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { login } from '@datalib/auth/login';
import { HttpError, NotAuthenticatedError } from '@utils/response/Errors';
import type { AuthToken } from '@typeDefs/auth/AuthToken';
import type UserCredentials from '@typeDefs/auth/UserCredentials';

export default async function Login(body: UserCredentials): Promise<{
  ok: boolean;
  body: AuthToken | null;
  error: string | null;
}> {
  try {
    const res = await login(body);

    if (!res.ok) {
      throw new NotAuthenticatedError(res.error || '');
    }

    const payload = jwt.decode(res.body || '') as AuthToken;
    cookies().set({
      name: 'auth_token',
      value: res.body || '',
      expires: payload.exp * 1000,
      secure: true,
      httpOnly: true,
    });

    return {
      ok: true,
      body: payload,
      error: null,
    };
  } catch (e) {
    const error = e as HttpError;
    return {
      ok: false,
      body: null,
      error: error.message,
    };
  }
}
