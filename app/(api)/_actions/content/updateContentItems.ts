'use server';
import { updateContentItem } from '@datalib/content/updateContentItem';
import { revalidatePath } from 'next/cache';
import WithCallback from '@app/(api)/_utils/callback/withCallback';

export const UpdateContentItem = WithCallback(
  async (content_type: string, id: string, body: object) => {
    const updateContentRes = await updateContentItem(content_type, id, body);
    revalidatePath(`/content/${content_type}`);
    return updateContentRes;
  }
);
