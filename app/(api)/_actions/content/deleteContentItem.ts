'use server';
import WithCallback from '@app/(api)/_utils/callback/withCallback';
import { deleteContentItem } from '@datalib/content/deleteContentItem';
import { revalidatePath } from 'next/cache';

export const DeleteContentItem = WithCallback(
  async (content_type: string, id: string) => {
    const deleteContentRes = await deleteContentItem(content_type, id);
    revalidatePath(`/content/${content_type}`);
    return deleteContentRes;
  }
);
