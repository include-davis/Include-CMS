'use server';
import jwt from 'jsonwebtoken';
import { register } from '@datalib/auth/register';
import { cookies } from 'next/headers';
import { HttpError } from '@utils/response/Errors';
import type { AuthToken } from '@typeDefs/auth/AuthToken';
import type UserCredentials from '@typeDefs/auth/UserCredentials';
import FormToJson from '@utils/form/FormToJSON';

export default async function Register(formData: FormData): Promise<{
  ok: boolean;
  body: AuthToken | null;
  error: string | null;
}> {
  try {
    const body = FormToJson(formData) as UserCredentials;
    const res = await register(body);

    if (!res.ok) {
      throw new HttpError(res.error || '');
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
