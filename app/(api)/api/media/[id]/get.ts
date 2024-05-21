// import { NextRequest } from 'next/server';
import { findMediaItem } from '../../../_datalib/media/findMediaItem';
import { useRouter } from 'next/router';

export async function GET() {
  const router = useRouter();
  return findMediaItem(router.query.id);
}
