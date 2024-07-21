import { NextRequest } from 'next/server';
import createMediaItem from '../../../(api)/_datalib/media/createMediaItem';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await createMediaItem(body);
  return res;
}
