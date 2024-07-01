import { NextRequest } from 'next/server';
import jwt, { Secret } from 'jsonwebtoken';
import NotAuthenticatedError from '@utils/response/NotAuthenticatedError';
import type { DecodedToken } from '@datatypes/auth';

export async function authFromRequest(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) {
    throw new NotAuthenticatedError('User not authenticated');
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as Secret
  ) as DecodedToken;

  if (decoded.exp * 1000 < Date.now()) {
    throw new NotAuthenticatedError('Authentication expired');
  }

  return decoded;
}
