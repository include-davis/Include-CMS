'use server';
import { createMediaItem } from '@datalib/media/createMediaItem';
import { revalidatePath } from 'next/cache';
import WithCallback from '@app/(api)/_utils/callback/withCallback';

export const CreateMediaItem = WithCallback(async (body: object) => {
  const createMediaItemRes = await createMediaItem(body);
  revalidatePath('/uploaded-media');
  return createMediaItemRes;
});
