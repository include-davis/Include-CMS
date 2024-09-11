'use server';

import {
  findContentItem,
  findContentItems,
} from '@datalib/content/findContentItem';

export async function FindContentItem(content_type: string, id: string) {
  return findContentItem(content_type, id);
}

export async function FindContentItems(
  content_type: string,
  query: object = {}
) {
  return findContentItems(content_type, query);
}
