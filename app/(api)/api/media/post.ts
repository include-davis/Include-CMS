import { NextRequest } from 'next/server';
import { createMediaItem } from '@datalib/media/createMediaItem';

export async function POST(request: NextRequest) {
  const body = await request.json();
  return createMediaItem(body);
}
