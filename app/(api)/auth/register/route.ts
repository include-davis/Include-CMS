'use server';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { register } from '@datalib/auth/register';
import { HttpError, NotAuthenticatedError } from '@utils/response/Errors';
import type { AuthToken } from '@typeDefs/auth/AuthToken';
import type UserCredentials from '@typeDefs/auth/UserCredentials';
import { authFromRequest } from '@app/(api)/_utils/auth/authFromRequest';
import { getDatabase } from '@app/(api)/_utils/mongodb/mongoClient.mjs';

export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase();
    try {
      await authFromRequest(request);
    } catch (e) {
      const userCount = await db.collection('users').countDocuments();
      if (userCount !== 0) {
        throw new NotAuthenticatedError('User not authenticated');
      }
    }

    const body: UserCredentials = await request.json();
    const registerRes = await register(body);

    if (!registerRes.ok) {
      throw new HttpError(registerRes.error || '');
    }

    const payload = jwt.decode(registerRes.body || '') as AuthToken;
    cookies().set({
      name: 'auth_token',
      value: registerRes.body || '',
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
