import { getClient } from '@utils/mongodb/mongoClient.mjs';
import { NotFoundError } from '@utils/response/Errors';

export async function findCollectionItems(collection : any, query = null) {
    try {
        const client = await getClient();
        const db = client.db;
        const reqCollection = await db.getCollection(collection);
        let reqDocument;

        if (query === null) {
            reqDocument = await reqCollection.find().toArray();
        } else {
            reqDocument = await reqCollection.find(query).toArray();
        }

        if (!reqDocument || reqDocument.length === 0) {
            throw new NotFoundError('No items found in collection');
        }

        return { ok: true, body: reqDocument, error: null };
    } catch (error : any) {
        if (error instanceof NotFoundError) {
            return { ok: false, body: null, error: { code: 404, message: error.message } };
        } else {
            return { ok: false, body: null, error: { code: 500, message: 'Internal Server Error' } };
        }
    }
}
