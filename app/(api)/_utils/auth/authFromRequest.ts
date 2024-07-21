import { NextRequest } from 'next/server';
import jwt, { Secret } from 'jsonwebtoken';
import NotAuthenticatedError from '@utils/response/NotAuthenticatedError';
import type { DecodedTokenInt } from '../../../_types/authToken';

export async function authFromRequest(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) {
    throw new NotAuthenticatedError('User not authenticated');
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as Secret
  ) as DecodedTokenInt;

  if (decoded.exp * 1000 < Date.now()) {
    throw new NotAuthenticatedError('Authentication expired');
  }

  return decoded;
}
