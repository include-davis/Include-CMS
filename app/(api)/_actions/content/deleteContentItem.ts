'use server';
import { deleteContentItem } from '@datalib/content/deleteContentItem';

export async function DeleteContentItem(content_type: string, id: string) {
  const deleteContentRes = await deleteContentItem(content_type, id);
  return deleteContentRes.json();
}
