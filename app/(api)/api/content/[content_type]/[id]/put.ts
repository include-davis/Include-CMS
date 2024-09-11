import { updateContentItem } from '@datalib/content/updateContentItem';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; content_type: string } }
) {
  const body = await request.json();
  return NextResponse.json(
    await updateContentItem(params.content_type, params.id, body)
  );
}
