import { ObjectId } from 'mongodb';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import parseAndReplace from '@utils/request/parseAndReplace';
import {
  HttpError,
  NoContentError,
  NotFoundError,
} from '@utils/response/Errors';

export async function updateMediaItem(id: string, body = {}) {
  try {
    if (!body || Object.keys(body).length === 0) {
      throw new NoContentError();
    }

    const db = await getDatabase();

    const objectId = ObjectId.createFromHexString(id);
    const updates = await parseAndReplace(body);
    updates.$set._last_modified = new Date().toISOString();

    const updateStatus = await db.collection('media').updateOne(
      {
        _id: objectId,
      },
      updates
    );

    if (updateStatus === null) {
      throw new NotFoundError(`Judge with id: ${id} not found.`);
    }

    return { ok: true, body: updateStatus, error: null };
  } catch (error) {
    const e = error as HttpError;
    return {
      ok: false,
      body: null,
      error: e.message || 'Internal Server Error',
    };
  }
}
