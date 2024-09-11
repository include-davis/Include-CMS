'use server';
import { createContentItem } from '@datalib/content/createContentItem';
import { revalidatePath } from 'next/cache';

export async function CreateContentItem(content_type: string, body: object) {
  const createContentRes = await createContentItem(content_type, body);
  revalidatePath(`/content/${content_type}`);
  return createContentRes;
}
