import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import parseAndReplace from '@utils/request/parseAndReplace';
import { HttpError, NoContentError } from '@utils/response/Errors';

export async function createMediaItem(body: object) {
  try {
    if (!body || Object.keys(body).length === 0) {
      throw new NoContentError();
    }

    const parsedBody = await parseAndReplace(body);

    const db = await getDatabase();
    const creationStatus = await db.collection('media').insertOne(parsedBody);

    const createdMedia = await db.collection('media').findOne({
      _id: ObjectId.createFromHexString(creationStatus.insertedId),
    });

    if (!createdMedia) {
      throw new HttpError('Failed to fetch the created item');
    }

    return NextResponse.json(
      { ok: true, body: createdMedia, error: null },
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
