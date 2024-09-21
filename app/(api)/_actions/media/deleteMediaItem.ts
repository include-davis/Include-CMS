'use server';
import { deleteMediaItem } from '@datalib/media/deleteMediaItem';
import { revalidatePath } from 'next/cache';
import WithCallback from '@app/(api)/_utils/callback/withCallback';

export const DeleteMediaItem = WithCallback(async (id: string) => {
  const deleteMediaRes = await deleteMediaItem(id);
  revalidatePath('/uploaded-media');
  return deleteMediaRes;
});
