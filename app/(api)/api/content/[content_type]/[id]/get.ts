import { NextRequest, NextResponse } from 'next/server';
import { findContentItem } from '@datalib/content/findContentItem';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string; content_type: string } }
) {
  return NextResponse.json(
    await findContentItem(params.content_type, params.id)
  );
}
