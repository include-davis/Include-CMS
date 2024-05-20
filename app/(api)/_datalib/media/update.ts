import { getClient } from '@utils/mongodb/mongoClient.mjs';
import { NotFoundError } from '@utils/response/Errors';

export async function updateMediaItem(id: string, inputData: string) {
  // TODO: ? type of id
  try {
    const client = await getClient();
    const db = client.db;
    const reqCollection = await db.getCollection('media');
    const reqDocument = await reqCollection.updateOne(id, inputData);
    if (!reqDocument || reqDocument.length === 0) {
      throw new NotFoundError(`No Item Found.`);
    }
    return { ok: true, body: reqDocument, error: null };
  } catch (error) {
    if (error instanceof NotFoundError) {
      return {
        ok: false,
        body: null,
        error: { code: error.status, message: error.message },
      };
    } else {
      return {
        ok: false,
        body: null,
        error: { code: 500, message: 'Internal Server Error' },
      };
    }
  }
}
