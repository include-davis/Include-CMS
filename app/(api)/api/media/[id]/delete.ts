import { NextRequest } from 'next/server';
import { deleteMediaItem } from '@datalib/media/deleteMediaItem';

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  return deleteMediaItem(params.id);
}
