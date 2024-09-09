'use server';
import { createMediaItem } from '@datalib/media/createMediaItem';

export async function CreateMediaItem(body: object) {
  const createMediaItemRes = await createMediaItem(body);
  return createMediaItemRes.json();
}
