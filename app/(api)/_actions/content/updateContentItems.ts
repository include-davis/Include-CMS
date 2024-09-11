'use server';
import { updateContentItem } from '@datalib/content/updateContentItem';
import { revalidatePath } from 'next/cache';

export async function UpdateContentItem(
  content_type: string,
  id: string,
  body: object
) {
  const updateContentRes = await updateContentItem(content_type, id, body);
  revalidatePath(`/content/${content_type}`);
  return updateContentRes.json();
}
