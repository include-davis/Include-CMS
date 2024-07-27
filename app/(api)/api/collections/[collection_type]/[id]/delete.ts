import { deleteCollectionItem } from '@datalib/collections/deleteCollectionItem';
import { NextRequest } from 'next/server';

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string; collection_type: string } }
) {
  return deleteCollectionItem(params.collection_type, params.id);
}
