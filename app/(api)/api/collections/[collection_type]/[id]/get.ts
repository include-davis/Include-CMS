import { NextRequest } from 'next/server';
import { findCollectionItem } from '@datalib/collections/findCollectionItem';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string; collection_type: string } }
) {
  const res = await findCollectionItem(params.collection_type, params.id);
  return res;
}
