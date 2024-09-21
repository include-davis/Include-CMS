'use server';
import { updateMediaItem } from '@datalib/media/updateMediaItem';
import { revalidatePath } from 'next/cache';
import WithCallback from '@app/(api)/_utils/callback/withCallback';

export const UpdateMediaItem = WithCallback(
  async (id: string, body: object) => {
    const updateMediaRes = await updateMediaItem(id, body);
    revalidatePath('/uploaded-media');
    return updateMediaRes;
  }
);
