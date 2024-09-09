'use server';
import { deleteMediaItem } from '@datalib/media/deleteMediaItem';

export async function DeleteMediaItem(id: string) {
  const deleteMediaRes = await deleteMediaItem(id);
  return deleteMediaRes.json();
}
