import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '../../_utils/mongodb/mongoClient.mjs';
import { HttpError, NoContentError } from '../../_utils/response/Errors';
import parseAndReplace from '@utils/request/parseAndReplace';

export default async function createCollectionItem(
  collection: string,
  data: object
) {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new NoContentError();
    }
    const parsedData = await parseAndReplace(data);

    const db = await getDatabase();
    const creationStatus = await db
      .collection(collection)
      .insertOne(parsedData);

    const newItem = await db.collection(collection).findOne({
      _id: new ObjectId(creationStatus.insertedId),
    });

    if (!newItem) {
      throw new HttpError('Failed to fetch the created item');
    }

    return NextResponse.json(
      { ok: true, body: newItem, error: null },
      { status: 201 }
    );
  } catch (e) {
    const error = e instanceof HttpError ? e : new HttpError();
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 500 }
    );
  }
}
