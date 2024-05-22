import { NextRequest } from 'next/server';
import createCollectionItem from '../../../../(api)/_datalib/collections/createCollectionItem';

export async function POST(
  request: NextRequest,
  { params }: { params: { collection_type: string } }
) {
  const body = await request.json();
  return createCollectionItem(params.collection_type, body);
}
