import { NextRequest, NextResponse } from 'next/server';
import { authFromRequest } from './authFromRequest';
import { HttpError } from '@utils/response/Errors';
export function authenticatedRoute(
  handler: (request: NextRequest, params: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, params: any) => {
    try {
      await authFromRequest(request);
    } catch (e) {
      const error = e as HttpError;
      return NextResponse.json(
        { ok: false, body: null, error: error.message },
        { status: error.status || 401 }
      );
    }
    return handler(request, params);
  };
}
