import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { NotFoundError } from '@utils/response/Errors';
import parseAndReplace from '@utils/request/parseAndReplace';

// Change to id
export async function updateCollectionItem(
  collection: string,
  query = {},
  update = {}
) {
  const parsedQuery = await parseAndReplace(query);
  try {
    const db = await getDatabase();
    const reqCollection = await db.collection(collection);
    const reqDocument = await reqCollection.findOneAndUpdate(
      parsedQuery,
      update
    );

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
