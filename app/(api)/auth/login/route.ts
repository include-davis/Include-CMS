'use server';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { login } from '@datalib/auth/login';
import { HttpError } from '@utils/response/Errors';
import type { AuthToken } from '@typeDefs/auth/AuthToken';
import type UserCredentials from '@typeDefs/auth/UserCredentials';

export async function POST(request: NextRequest) {
  try {
    const body: UserCredentials = await request.json();
    const loginRes = await login(body);

    if (!loginRes.ok) {
      throw new HttpError(loginRes.error || '');
    }

    const payload = jwt.decode(loginRes.body || '') as AuthToken;

    cookies().set({
      name: 'auth_token',
      value: loginRes.body || '',
      expires: payload.exp * 1000,
      secure: true,
      httpOnly: true,
    });

    return NextResponse.json(
      { ok: true, body: null, error: null },
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
