import { NextRequest } from 'next/server';
import { findMediaItems } from '@datalib/media/findMediaItem';
import getQueries from '@utils/request/getQueries';

export async function GET(request: NextRequest) {
  const queries = getQueries(request);
  return findMediaItems(queries);
}
