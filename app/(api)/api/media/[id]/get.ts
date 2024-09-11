import { NextRequest, NextResponse } from 'next/server';
import { findMediaItem } from '@datalib/media/findMediaItem';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(await findMediaItem(params.id));
}
