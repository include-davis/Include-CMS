import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function findContentItem(content_type: string, id: string) {
  try {
    const db = await getDatabase();

    const contentItem = await db.collection(content_type).findOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (!contentItem) {
      throw new NotFoundError(`No Items ${id} found in ${content_type}`);
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

export async function findContentItems(
  content_type: string,
  query: object = {}
) {
  try {
    const db = await getDatabase();
    const contentItems = await db
      .collection(content_type)
      .find(query)
      .toArray();

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
