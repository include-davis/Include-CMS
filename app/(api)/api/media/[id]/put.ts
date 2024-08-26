import { NextRequest } from 'next/server';
import { updateMediaItem } from '@datalib/media/updateMediaItem';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  return updateMediaItem(params.id, body);
}
