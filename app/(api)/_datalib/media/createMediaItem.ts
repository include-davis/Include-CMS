import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import parseAndReplace from '@utils/request/parseAndReplace';
import { HttpError, NoContentError } from '@utils/response/Errors';
import isBodyEmpty from '@utils/request/isBodyEmpty';

export async function createMediaItem(body: object) {
  try {
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }
    const parsedBody = await parseAndReplace(body);

    const db = await getDatabase();
    const currentDate = new Date().toISOString();
    const creationStatus = await db.collection('media').insertOne({
      ...parsedBody,
      _last_modified: currentDate,
      _created_at: currentDate,
    });

    const createdMedia = await db.collection('media').findOne({
      _id: creationStatus.insertedId,
    });

    if (!createdMedia) {
      throw new HttpError('Failed to fetch the created item');
    }

    return { ok: true, body: createdMedia, error: null };
  } catch (e) {
    const error = e as HttpError;
    return {
      ok: false,
      body: null,
      error: error.message || 'Internal Server Error',
    };
  }
}
