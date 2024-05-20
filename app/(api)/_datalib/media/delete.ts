import { getClient } from '@utils/mongodb/mongoClient.mjs';
import { NotFoundError } from '@utils/response/Errors';

export async function createMediaItem(inputData: string) {
  try {
    const client = await getClient();
    const db = client.db;
    const reqCollection = await db.Collection('Media');
    const status = await db.collection(reqCollection).deleteOne(inputData);
    if (status.deletedCount == 0) {
      //status is an object that returns # of documents deleted
      throw new NotFoundError(`No Items Found to Delete.`);
    }
    return { ok: true, body: status, error: null };
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
