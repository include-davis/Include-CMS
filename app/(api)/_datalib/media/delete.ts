import { getClient } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { NextResponse } from 'next/server';

export async function deleteMediaItem(id: string) {
  try {
    const client = await getClient();
    const db = client.db;
    const reqCollection = await db.Collection('Media');
    const status = await db.collection(reqCollection).deleteOne(id);
    if (status.deletedCount == 0) {
      //status is an object that returns # of documents deleted
      throw new NotFoundError(`No Items Found to Delete.`);
    }
    return { ok: true, body: status, error: null };
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
}
