'use server';
import { cookies } from 'next/headers';

export default async function Logout() {
  const cookieStore = cookies();
  const authTokenCookie = cookieStore.get('auth_token');
  if (!authTokenCookie) {
    return { ok: false, body: null, error: 'No Auth Token Found' };
  }
  cookies().delete('auth_token');
  return { ok: true, body: null, error: null };
}
