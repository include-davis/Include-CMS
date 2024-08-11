import { NextRequest } from 'next/server';
import { findMediaItem } from '@datalib/media/findMediaItem';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  return findMediaItem(params.id);
}
