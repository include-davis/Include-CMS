import { NextRequest } from 'next/server';
import { findCollectionItem } from '../../../../_datalib/collections/findCollectionItem';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string; collection_type: string } }
) {
  return findCollectionItem(params.collection_type, params.id);
}
