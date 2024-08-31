'use server';
import {
  findContentItem,
  findContentItems,
} from '@datalib/content/findContentItem';

export async function FindContentItem(content_type: string, id: string) {
  const contentItemRes = await findContentItem(content_type, id);
  return contentItemRes.json();
}

export async function FindContentItems(
  content_type: string,
  query: object = {}
) {
  const contentItemsRes = await findContentItems(content_type, query);
  return contentItemsRes.json();
}
