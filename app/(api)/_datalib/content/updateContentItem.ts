import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import {
  HttpError,
  NotFoundError,
  NoContentError,
} from '@utils/response/Errors';
import parseAndReplace from '@utils/request/parseAndReplace';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import isBodyEmpty from '@utils/request/isBodyEmpty';

export async function updateContentItem(
  content_type: string,
  id: string,
  body: object
) {
  try {
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }

    const object_id = ObjectId.createFromHexString(id);
    const parsedBody = await parseAndReplace(body);
    parsedBody.$set.last_modified = new Date().toISOString();

    const db = await getDatabase();
    const updateStatus = await db
      .collection(content_type)
      .updateOne({ _id: object_id }, parsedBody);

    if (updateStatus.modifiedCount === 0) {
      throw new NotFoundError(
        `CollectionItem ${id} not found from ${content_type}`
      );
    }

    return NextResponse.json(
      {
        ok: true,
        body: 'CollectionItem updated.',
        error: null,
      },
      { status: 200 }
    );
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      {
        ok: false,
        body: null,
        error: error.message || 'Internal Server Error',
      },
      { status: error.status || 400 }
    );
  }
}
