import { deleteContentItem } from '@datalib/content/deleteContentItem';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string; content_type: string } }
) {
  return NextResponse.json(
    await deleteContentItem(params.content_type, params.id)
  );
}
