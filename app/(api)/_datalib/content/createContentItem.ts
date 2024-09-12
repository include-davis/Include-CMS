import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NoContentError } from '../../_utils/response/Errors';
import parseAndReplace from '@utils/request/parseAndReplace';
import isBodyEmpty from '@utils/request/isBodyEmpty';

export async function createContentItem(content_type: string, body: object) {
  try {
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }
    const parsedBody = await parseAndReplace(body);
    const db = await getDatabase();

    const currentDate = new Date().toISOString();

    const creationStatus = await db.collection(content_type).insertOne({
      ...parsedBody,
      _last_modified: currentDate,
      _created_at: currentDate,
    });

    const newItem = await db.collection(content_type).findOne({
      _id: creationStatus.insertedId,
    });

    if (!newItem) {
      throw new HttpError('Failed to fetch the created item');
    }

    return { ok: true, body: JSON.parse(JSON.stringify(newItem)), error: null };
  } catch (e) {
    const error = e as HttpError;
    return {
      ok: false,
      body: null,
      error: error.message || 'Internal Server Error',
    };
  }
}
