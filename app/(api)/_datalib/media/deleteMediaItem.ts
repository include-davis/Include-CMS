import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { NotFoundError } from '@utils/response/Errors';

export async function deleteMediaItem(id: string) {
  try {
    const db = await getDatabase();
    const reqCollection = await db.collection('media');

    const reqDocument = await reqCollection.findOneAndDelete({
      id: id,
    });

    if (!reqDocument || reqDocument.length === 0) {
      throw new NotFoundError(`No Items Found.`);
    }

    return { ok: true, body: 'MediaItem deleted.', error: null };
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
