import { NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NoContentError } from '../../_utils/response/Errors';
import parseAndReplace from '@utils/request/parseAndReplace';
import isBodyEmpty from '@app/(api)/_utils/request/isBodyEmpty';

export default async function createCollectionItem(
  collection: string,
  body: object
) {
  try {
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }
    const parsedBody = await parseAndReplace(body);

    const db = await getDatabase();
    const creationStatus = await db
      .collection(collection)
      .insertOne(parsedBody);

    console.log(creationStatus);

    const newItem = await db.collection(collection).findOne({
      _id: creationStatus.insertedId,
    });

    if (!newItem) {
      throw new HttpError('Failed to fetch the created item');
    }

    return NextResponse.json(
      { ok: true, body: newItem, error: null },
      { status: 201 }
    );
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      {
        ok: false,
        body: null,
        error: error.message || 'Internal Server Error',
      },
      { status: error.status || 500 }
    );
  }
}
