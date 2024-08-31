'use server';
import { createContentItem } from '@datalib/content/createContentItem';

export async function CreateContentItem(content_type: string, body: object) {
  const createContentRes = await createContentItem(content_type, body);
  return createContentRes.json();
}
