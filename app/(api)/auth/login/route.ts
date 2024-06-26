'use server';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { Login } from '@datalib/auth/login';
import { HttpError, NotAuthenticatedError } from '@utils/response/Errors';
import type { AuthTokenInterface } from '@datatypes/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await Login(body);
    const data = await res.json();

    if (!data.ok) {
      throw new NotAuthenticatedError(data.error);
    }

    const payload = jwt.decode(data.body) as AuthTokenInterface;
    cookies().set({
      name: 'auth_token',
      value: data.body,
      expires: payload.exp * 1000,
      secure: true,
      httpOnly: true,
    });
    return NextResponse.json(
      { ok: true, body: payload, error: null },
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
