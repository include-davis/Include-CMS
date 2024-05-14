import { NextRequest } from 'next/server';
import { findMediaItem } from '../../../_datalib/media/findMediaItem';

export function GET(_: NextRequest, { params }: { params: { id: string } }) {
  return findMediaItem(params.id);
}
