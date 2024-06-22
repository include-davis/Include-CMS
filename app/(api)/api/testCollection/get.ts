// import { NextRequest } from 'next/server';
import { findCollectionItem } from '../../_datalib/collections/findCollectionItem';

export async function GET() {
  const id = '65eec1882c813a9abe9dd19d';
  return findCollectionItem('testCollection', id);
}
