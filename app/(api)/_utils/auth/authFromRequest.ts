import { NextRequest } from 'next/server';
import NotAuthenticatedError from '@utils/response/NotAuthenticatedError';
import { verifyAuthToken } from './authTokenHandlers';

export async function authFromRequest(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) {
    throw new NotAuthenticatedError('User not authenticated');
  }

  const verifyRes = await verifyAuthToken(token);
  if (!verifyRes.ok) {
    throw verifyRes.error;
  }

  return verifyRes.body;
}
