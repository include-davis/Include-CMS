import { getClient } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '../../_utils/response/Errors';
import { NoContentError } from '@utils/response/Errors';
import isBodyEmpty from '@utils/request/isBodyEmpty';
import { NextResponse } from 'next/server';

export async function updateCollectionItem(
  collectionName: never,
  id: string,
  body: object
) {
  try {
    if (!id || isBodyEmpty(body)) {
      throw new NoContentError();
    }

    const client = await getClient();
    const db = client.db;
    const collection = db.collection(collectionName);

    const result = await collection.findOneAndUpdate({ _id: id }, body);

    if (!result.value) {
      throw new NotFoundError(
        `No item with ID ${id} found in collection ${collectionName}`
      );
    }
    return { ok: true, body: result.value, error: null };
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
}
