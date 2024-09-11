'use server';
import { updateMediaItem } from '@datalib/media/updateMediaItem';
import { revalidatePath } from 'next/cache';

export async function UpdateMediaItem(id: string, body: object) {
  const updateMediaRes = await updateMediaItem(id, body);
  revalidatePath('/uploaded-media');
  return updateMediaRes.json();
}
