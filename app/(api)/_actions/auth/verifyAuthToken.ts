'use server';

import { verifyAuthToken } from '@datalib/auth/verifyAuthToken';
import { cookies } from 'next/headers';

export default async function VerifyAuthToken() {
  const cookieStore = cookies();
  const cookie = cookieStore.get('auth_token');
  if (!cookie) {
    return { ok: false, body: null, error: 'No Auth Token Found' };
  }
  const token = cookie.value;
  return verifyAuthToken(token);
}
