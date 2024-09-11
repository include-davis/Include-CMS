import { NextRequest, NextResponse } from 'next/server';
import { findContentItems } from '@datalib/content/findContentItem';
import getQueries from '@utils/request/getQueries';

export async function GET(
  request: NextRequest,
  { params }: { params: { content_type: string } }
) {
  const collection = params.content_type;
  const query = await getQueries(request, collection);
  return NextResponse.json(await findContentItems(collection, query));
}
