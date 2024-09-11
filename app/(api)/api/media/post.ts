import { NextRequest, NextResponse } from 'next/server';
import { createMediaItem } from '@datalib/media/createMediaItem';

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(await createMediaItem(body));
}
