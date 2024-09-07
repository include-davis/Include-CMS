import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';

export async function findMediaItem(id: string) {
  try {
    const db = await getDatabase();
    const objectId = ObjectId.createFromHexString(id);

    const mediaItem = await db.collection('media').findOne({
      _id: objectId,
    });

    if (!mediaItem) {
      throw new NotFoundError(`Media item with id: ${id} not found.`);
    }

    return NextResponse.json(
      { ok: true, body: mediaItem, error: null },
      { status: 200 }
    );
  } catch (error) {
    const e = error as HttpError;
    return NextResponse.json(
      {
        ok: false,
        body: null,
        error: e.message || 'Internal Server Error',
      },
      { status: e.status || 500 }
    );
  }
}

export async function findMediaItems(query: object = {}) {
  try {
    const db = await getDatabase();
    const mediaItems = await db.collection('media').find(query).toArray();
    return NextResponse.json(
      { ok: true, body: mediaItems, error: null },
      { status: 200 }
    );
  } catch (error) {
    const e = error as HttpError;
    return NextResponse.json(
      {
        ok: false,
        body: null,
        error: e.message || 'Internal Server Error',
      },
      { status: e.status || 500 }
    );
  }
}
