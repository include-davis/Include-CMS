import { updateContentItem } from '@datalib/content/updateContentItem';
import { NextRequest } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; content_type: string } }
) {
  const body = await request.json();
  return updateContentItem(params.content_type, params.id, body);
}
