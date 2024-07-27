import { NextRequest } from 'next/server';
import { getCollectionItem } from '@datalib/collections/getCollectionItem';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string; collection_type: string } }
) {
  return getCollectionItem(params.collection_type, params.id);
}
