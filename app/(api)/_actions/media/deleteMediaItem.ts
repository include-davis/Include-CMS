'use server';
import { deleteMediaItem } from '@datalib/media/deleteMediaItem';
import { revalidatePath } from 'next/cache';

export async function DeleteMediaItem(id: string) {
  const deleteMediaRes = await deleteMediaItem(id);
  revalidatePath('/uploaded-media');
  return deleteMediaRes;
}
