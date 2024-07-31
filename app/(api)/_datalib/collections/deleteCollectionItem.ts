import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { NotFoundError, HttpError } from '@utils/response/Errors';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function deleteCollectionItem(collection: string, id: string) {
  try {
    const db = await getDatabase();
    const reqCollection = await db.collection(collection);
    const object_id = new ObjectId(id);

    const deleteStatus = await reqCollection.deleteOne({
      _id: object_id,
    });

    if (deleteStatus.deletedCount === 0) {
      throw new NotFoundError(`CollectionItem ${id} not found`);
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
        error: error.message,
      },
      { status: error.status || 400 }
    );
  }
}
