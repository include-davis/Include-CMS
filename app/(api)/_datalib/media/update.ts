import { getClient } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { NextResponse } from 'next/server';

export async function updateMediaItem(id: string, inputData: string) {
  try {
    const client = await getClient();
    const db = client.db;
    const reqCollection = await db.getCollection('media');
    const reqDocument = await reqCollection.updateOne(id, inputData);
    if (!reqDocument || reqDocument.length === 0) {
      throw new NotFoundError(`No Item Found.`);
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
