import { NextRequest } from 'next/server';
import { verifyAuthToken } from '@datalib/auth/verifyAuthToken';
import HttpError from '@utils/response/HttpError';
import jwt from 'jsonwebtoken';
import NotAuthenticatedError from '@utils/response/NotAuthenticatedError';
import type AuthTokenInt from '@typeDefs/authToken';

export async function authFromRequest(request: NextRequest) {
  try {
    const body = await request.json();
    const token = body.cookies().get('auth_cookie');
    const response = await verifyAuthToken(token);
    if (!response.ok) {
      throw new NotAuthenticatedError('Unauthorized. Invalid token.');
    }

    if (typeof response.body !== 'string') {
      throw new NotAuthenticatedError('Token is invalid or not present');
    }
    const decoded_token = jwt.decode(response.body) as AuthTokenInt;
    if (!decoded_token) {
      throw new NotAuthenticatedError('Failed to decode token.');
    }
    return { ok: true, data: decoded_token, error: null };
  } catch (e) {
    return { ok: false, body: null, error: e as HttpError };
  }
}
