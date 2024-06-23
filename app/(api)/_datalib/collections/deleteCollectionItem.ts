import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { NotFoundError } from '@utils/response/Errors';

export async function deleteCollectionItem(collection: string, id: string) {
  try {
    const db = await getDatabase();
    const reqCollection = await db.collection(collection);

    const reqDocument = await reqCollection.findOneAndDelete({
      id: id,
    });

    if (!reqDocument || reqDocument.length === 0) {
      throw new NotFoundError(`No Items Found.`);
    }

    return { ok: true, body: 'CollectionItem deleted.', error: null };
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
