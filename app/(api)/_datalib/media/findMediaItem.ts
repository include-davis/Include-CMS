import { ObjectId } from 'mongodb';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';

export async function findMediaItem(id: string) {
  try {
    const db = await getDatabase();
    const objectId = ObjectId.createFromHexString(id);

    const mediaItem = await db.collection('media').findOne({
      _id: objectId,
    });

    if (!mediaItem) {
      throw new NotFoundError(`Media item with id: ${id} not found.`);
    }

    return { ok: true, body: mediaItem, error: null };
  } catch (error) {
    const e = error as HttpError;
    return {
      ok: false,
      body: null,
      error: e.message || 'Internal Server Error',
    };
  }
}

export async function findMediaItems(query: object = {}) {
  try {
    const db = await getDatabase();
    const mediaItems = await db.collection('media').find(query).toArray();
    return { ok: true, body: mediaItems, error: null };
  } catch (error) {
    const e = error as HttpError;
    return {
      ok: false,
      body: null,
      error: e.message || 'Internal Server Error',
    };
  }
}
