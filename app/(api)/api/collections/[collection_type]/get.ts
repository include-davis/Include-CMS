import { NextRequest } from 'next/server';
import { findCollectionItems } from '@datalib/collections/findCollectionItem';
import getQueries from '@utils/request/getQueries';

export async function GET(
  request: NextRequest,
  { params }: { params: { collection_type: string } }
) {
  const collection = params.collection_type;
  const query = await getQueries(request, collection);
  return findCollectionItems(collection, query);
}
