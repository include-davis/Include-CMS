import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '../../_utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '../../_utils/response/Errors';

export const findMediaItem = async (id) => {
  try {
    const db = await getDatabase();
    const object_id = new ObjectId(id);
    const item = await db.collection('media').findOne({ _id: object_id });

    if (!item) {
      throw new NotFoundError(`Item with id: ${id} not found.`);
    }

    return NextResponse.json({ ok: true, body: item }, { status: 200 });
  } catch (e) {
    const error =
      e instanceof HttpError
        ? e
        : new HttpError(e.message || 'Internal Server Error');
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status || 500 }
    );
  }
};
