import { getClient } from '@utils/mongodb/mongoClient.mjs';
import { NotFoundError, HttpError } from '@utils/response/Errors';
import { NextResponse } from 'next/server';

export async function findCollectionItems(collection: string, query = {}) {
  try {
    const client = await getClient();
    const db = client.db;
    const reqCollection = await db.getCollection(collection);
    const reqDocument = await reqCollection.find(query).toArray();
    if (!reqDocument || reqDocument.length === 0) {
      throw new NotFoundError(`No Items Found.`);
    }
    return { ok: true, body: reqDocument, error: null };
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
}
