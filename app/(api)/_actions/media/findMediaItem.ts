'use server';
import { findMediaItem, findMediaItems } from '@datalib/media/findMediaItem';

export async function FindMediaItem(id: string) {
  const mediaItemRes = await findMediaItem(id);
  return mediaItemRes.json();
}

export async function FindMediaItems(query: object = {}) {
  const mediaItemsRes = await findMediaItems(query);
  return mediaItemsRes.json();
}
