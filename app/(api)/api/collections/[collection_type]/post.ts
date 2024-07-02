import { NextRequest } from 'next/server';
import createCollectionItem from '@datalib/collections/createCollectionItem';

export async function POST(
  request: NextRequest,
  { params }: { params: { collection_type: string } }
) {
  const body = await request.json();
  const res = await createCollectionItem(params.collection_type, body);
  return res;
}
