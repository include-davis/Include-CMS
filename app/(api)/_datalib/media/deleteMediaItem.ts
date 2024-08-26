import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';

export async function deleteMediaItem(id: string) {
  try {
    const db = await getDatabase();
    const objectId = ObjectId.createFromHexString(id);

    const deleteStatus = await db.collection('media').deleteOne({
      _id: objectId,
    });

    if (deleteStatus.deletedCount === 0) {
      throw new NotFoundError(`media item with id: ${id} not found.`);
    }

    return NextResponse.json(
      {
        ok: true,
        body: 'media item deleted.',
        error: null,
      },
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
