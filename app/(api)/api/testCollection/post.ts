import { NextRequest } from 'next/server';
import createCollectionItem from '../../_datalib/collections/createCollectionItem';

export async function POST(request: NextRequest) {
  const body = await request.json();
  return createCollectionItem('testCollection', body);
}
