import { getClient } from '@utils/mongodb/mongoClient.mjs';

export async function createMediaItem(inputData: object) {
  //TODO: QUESTION is type of inputData now okay, if not could you please specify its exact type
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
