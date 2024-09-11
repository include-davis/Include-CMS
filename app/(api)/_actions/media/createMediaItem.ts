'use server';
import { createMediaItem } from '@datalib/media/createMediaItem';
import { revalidatePath } from 'next/cache';

export async function CreateMediaItem(body: object) {
  const createMediaItemRes = await createMediaItem(body);
  revalidatePath('/uploaded-media');
  return createMediaItemRes;
}
