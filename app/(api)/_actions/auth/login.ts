'use server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { Login } from '@datalib/auth/login';
import { HttpError, NotAuthenticatedError } from '@utils/response/Errors';
import type { AuthTokenInt } from '@typeDefs/authToken';
import type { UserCredentials } from '@typeDefs/UserCredentials';
import FormToJson from '@utils/form/FormToJSON';

export default async function LoginAction(formData: FormData): Promise<{
  ok: boolean;
  body: AuthTokenInt | null;
  error: string | null;
}> {
  try {
    const body = FormToJson(formData) as UserCredentials;
    const res = await Login(body);
    const data = await res.json();

    if (!res.ok) {
      throw new NotAuthenticatedError(data.error);
    }

    const payload = jwt.decode(data.body) as AuthTokenInt;
    cookies().set({
      name: 'auth_token',
      value: data.body,
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
