import { NextRequest } from 'next/server';
import { findContentItem } from '@datalib/content/findContentItem';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string; content_type: string } }
) {
  return findContentItem(params.content_type, params.id);
}
