import { getClient } from '@utils/mongodb/mongoClient.mjs';

export async function createMediaItem(inputData: string) {
  //TODO: QUESTION TYPE OF INPUT DATA shouldn't it be an object
  try {
    const client = await getClient();
    const db = client.db;
    const reqCollection = await db.getCollection('Media');
    const reqDocument = await db.collection(reqCollection).insertOne(inputData);
    return { ok: true, body: reqDocument, error: null };
  } catch (error) {
    console.error('error creating media item', error);
    return {
      ok: false,
      body: null,
      error: { code: 500, message: 'Internal Server Error' },
    };
  }
}
