import { NextRequest, NextResponse } from 'next/server';
import { createContentItem } from '@datalib/content/createContentItem';

export async function POST(
  request: NextRequest,
  { params }: { params: { content_type: string } }
) {
  const body = await request.json();
  return NextResponse.json(await createContentItem(params.content_type, body));
}
