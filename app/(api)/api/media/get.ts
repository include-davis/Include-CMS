import { NextRequest, NextResponse } from 'next/server';
import { findMediaItems } from '@datalib/media/findMediaItem';
import getQueries from '@utils/request/getQueries';

export async function GET(request: NextRequest) {
  const queries = await getQueries(request, 'media');
  return NextResponse.json(await findMediaItems(queries));
}
