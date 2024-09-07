import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { NotFoundError, HttpError } from '@utils/response/Errors';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function deleteContentItem(content_type: string, id: string) {
  try {
    const db = await getDatabase();
    const object_id = ObjectId.createFromHexString(id);

    const deleteStatus = await db.collection(content_type).deleteOne({
      _id: object_id,
    });

    if (deleteStatus.deletedCount === 0) {
      throw new NotFoundError(`${content_type} with id: ${id} not found`);
    }

    return NextResponse.json(
      {
        ok: true,
        body: 'CollectionItem deleted.',
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
