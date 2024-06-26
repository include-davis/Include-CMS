import { NextRequest, NextResponse } from 'next/server';
import { authFromRequest } from './authFromRequest';
import { HttpError } from '@utils/response/Errors';
export async function ProtectedRoute(
  handler: (request: NextRequest, params: object) => Promise<NextResponse>
) {
  return async (request: NextRequest, params: object) => {
    try {
      await authFromRequest(request);
    } catch (e) {
      const error = e as HttpError;
      return Response.json(
        { ok: false, body: null, error: error.message },
        { status: error.status || 401 }
      );
    }
    return handler(request, params);
  };
}
