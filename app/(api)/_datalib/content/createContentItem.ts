import { NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NoContentError } from '../../_utils/response/Errors';
import parseAndReplace from '@utils/request/parseAndReplace';
import isBodyEmpty from '@app/(api)/_utils/request/isBodyEmpty';

export async function createContentItem(content_type: string, body: object) {
  try {
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }
    const parsedBody = await parseAndReplace(body);
    const db = await getDatabase();

    const currentDate = new Date().toISOString();

    const creationStatus = await db.collection(content_type).insertOne({
      ...parsedBody,
      last_modified: currentDate,
      created_at: currentDate,
    });

    console.log(creationStatus);

    const newItem = await db.collection(content_type).findOne({
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
