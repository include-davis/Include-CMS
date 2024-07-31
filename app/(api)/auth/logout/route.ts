'use server';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(_: NextRequest) {
  // should we check if cookie exists? - cookies().has('auth_token')
  cookies().delete('auth_token');
  return NextResponse.json(
    { ok: true, body: null, error: null },
    { status: 200 }
  );
}
