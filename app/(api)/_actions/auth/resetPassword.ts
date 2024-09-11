'use server';
import { resetPassword } from '@datalib/auth/resetPassword';
import { HttpError } from '@utils/response/Errors';
import type { UserCredentials } from '@typeDefs/auth/UserCredentials';
import FormToJson from '@utils/form/FormToJSON';

export default async function ResetPassword(formData: FormData): Promise<{
  ok: boolean;
  body: object | null;
  error: string | null;
}> {
  try {
    const body = FormToJson(formData) as UserCredentials;
    const res = await ResetPassword(body);
    const data = await res.json();

    if (!data.ok) {
      throw new HttpError(data.error);
    }

    return { ok: true, body: data, error: null };
  } catch (e) {
    const error = e as HttpError;
    return { ok: false, body: null, error: error.message };
  }
}
