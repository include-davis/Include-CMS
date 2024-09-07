'use server';
import { updateContentItem } from '@datalib/content/updateContentItem';

export async function UpdateContentItem(
  content_type: string,
  id: string,
  body: object
) {
  const updateContentRes = await updateContentItem(content_type, id, body);
  return updateContentRes.json();
}
