'use server';
import WithCallback from '@app/(api)/_utils/callback/withCallback';
import { createContentItem } from '@datalib/content/createContentItem';
import { revalidatePath } from 'next/cache';

export const CreateContentItem = WithCallback(
  async (content_type: string, body: object) => {
    const createContentRes = await createContentItem(content_type, body);
    revalidatePath(`/content/${content_type}`);
    return createContentRes;
  }
);
