import { NextRequest } from 'next/server';
import createContentItem from '@datalib/content/createContentItem';

export async function POST(
  request: NextRequest,
  { params }: { params: { content_type: string } }
) {
  const body = await request.json();
  return createContentItem(params.content_type, body);
}
