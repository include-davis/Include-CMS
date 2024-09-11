'use server';
import { deleteContentItem } from '@datalib/content/deleteContentItem';
import { revalidatePath } from 'next/cache';

export async function DeleteContentItem(content_type: string, id: string) {
  const deleteContentRes = await deleteContentItem(content_type, id);
  revalidatePath(`/content/${content_type}`);
  return deleteContentRes.json();
}
