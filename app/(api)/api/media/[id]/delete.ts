import { NextRequest, NextResponse } from 'next/server';
import { deleteMediaItem } from '@datalib/media/deleteMediaItem';

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json(await deleteMediaItem(params.id));
}
