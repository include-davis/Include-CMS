'use server';

import { findMediaItem, findMediaItems } from '@datalib/media/findMediaItem';

export async function FindMediaItem(id: string) {
  return findMediaItem(id);
}

export async function FindMediaItems(query: object = {}) {
  return findMediaItems(query);
}
