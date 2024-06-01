import { getClient } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { NextResponse } from 'next/server';

export async function findMediaItem(id: string) {
  try {
    const client = await getClient();
    const db = client.db;
    const reqCollection = await db.getCollection('media');
    const reqDocument = await reqCollection.findOne(id);
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

//TODO: still working on bottom fun()
export async function findMediaItems(id: string) {
  // TODO: ? type of id
  try {
    const client = await getClient();
    const db = client.db;
    const reqCollection = await db.getCollection('media');
    const reqDocuments = await reqCollection.find(id).toArray();
    if (!reqDocuments || reqDocuments.length === 0) {
      throw new NotFoundError(`No Items Found.`);
    }
    return { ok: true, body: reqDocuments, error: null };
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
