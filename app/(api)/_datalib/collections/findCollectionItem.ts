import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function findCollectionItem(collection: string, id: string) {
  try {
    const db = await getDatabase();

    const contentItem = await db.collection(collection).findOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (!contentItem) {
      throw new NotFoundError(`No Items ${id} Found in ${collection}`);
    }

    return NextResponse.json(
      { ok: true, body: contentItem, error: null },
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

export async function findCollectionItems(
  collection: string,
  query: object = {}
) {
  try {
    const db = await getDatabase();
    const contentItems = await db.collection(collection).find(query).toArray();

    return NextResponse.json(
      { ok: true, body: contentItems, error: null },
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
