'use server';
import { resetPassword } from '@datalib/auth/resetPassword';
import { HttpError } from '@utils/response/Errors';
import type UserCredentials from '@typeDefs/auth/UserCredentials';
import FormToJson from '@utils/form/FormToJSON';

export default async function ResetPassword(formData: FormData): Promise<{
  ok: boolean;
  body: object | null;
  error: string | null;
}> {
  try {
    const body = FormToJson(formData) as UserCredentials;
    const res = await resetPassword(body);

    if (!res.ok) {
      throw new HttpError(res.error || '');
    }

    return { ok: true, body: res, error: null };
  } catch (e) {
    const error = e as HttpError;
    return { ok: false, body: null, error: error.message };
  }
}
