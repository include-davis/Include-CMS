import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function getCollectionItem(collection: string, id: string) {
  try {
    const db = await getDatabase();
    const reqCollection = await db.collection(collection);
    const object_id = new ObjectId(id);

    const reqDocument = await reqCollection.findOne({
      _id: object_id,
    });

    if (!reqDocument || reqDocument.length === 0) {
      throw new NotFoundError(`No Items ${id} Found in ${collection}`);
    }

    return NextResponse.json(
      { ok: true, body: reqDocument, error: null },
      { status: 200 }
    );
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
}
