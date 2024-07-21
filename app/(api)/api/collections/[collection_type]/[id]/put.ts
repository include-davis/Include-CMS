import { updateCollectionItem } from '@datalib/collections/updateCollectionItem';
import { NextRequest } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; collection_type: string } }
) {
  const body = await request.json();
  return updateCollectionItem(params.collection_type, params.id, body);
}
