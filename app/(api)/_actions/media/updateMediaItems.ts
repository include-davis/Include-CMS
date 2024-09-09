'use server';
import { updateMediaItem } from '@datalib/media/updateMediaItem';

export async function UpdateMediaItem(id: string, body: object) {
  const updateMediaRes = await updateMediaItem(id, body);
  return updateMediaRes.json();
}
