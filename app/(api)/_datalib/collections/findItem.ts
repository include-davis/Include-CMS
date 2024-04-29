import { getClient } from '@utils/mongodb/mongoClient.mjs';
import { NotFoundError } from '@utils/response/Errors';

export async function findCollectionItems(collection: never, query = null) {
  try {
    const client = await getClient();
    const db = client.db;
    const reqCollection = await db.getCollection(collection);
    const reqDocument = await reqCollection.find(query).toArray();
    if (!reqDocument || reqDocument.length === 0) {
      throw new NotFoundError(`No Items Found.`);
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
