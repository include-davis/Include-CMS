'use server';
import jwt from 'jsonwebtoken';
import { Register } from '@datalib/auth/register';
import { cookies } from 'next/headers';
import { HttpError } from '@utils/response/Errors';
import type { AuthTokenInt } from '@datatypes/authToken';
import type { UserCredentials } from '@typeDefs/UserCredentials';
import FormToJson from '@utils/form/FormToJSON';

export default async function RegisterAction(formData: FormData): Promise<{
  ok: boolean;
  body: AuthTokenInt | null;
  error: string | null;
}> {
  try {
    const body = FormToJson(formData) as UserCredentials;
    const res = await Register(body);
    const data = await res.json();

    if (!data.ok) {
      throw new HttpError(data.error);
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
