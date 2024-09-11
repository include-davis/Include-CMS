'use server';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(_: NextRequest) {
  cookies().delete('auth_token');
  return NextResponse.json(
    { ok: true, body: null, error: null },
    { status: 200 }
  );
}
