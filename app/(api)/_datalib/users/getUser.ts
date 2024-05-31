import { NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { ObjectId } from 'mongodb';

export const getUser = async (id: string) => {
  try {
    const objectId = new ObjectId(id);
    const db = await getDatabase();

    const user = await db.collection('users').findOne({ _id: objectId });

    if (!user) {
      throw new NotFoundError(`User with id: ${id} not found.`);
    }

    return NextResponse.json(
      { ok: true, body: user, error: null },
      { status: 200 }
    );
  } catch (e) {
    const error = e as HttpError;

    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
};

export const GetManyUsers = async (query: object = {}) => {
  try {
    const db = await getDatabase();
    const user = await db.collection('users').find(query).toArray();

    return NextResponse.json(
      { ok: true, body: user, error: null },
      { status: 200 }
    );
  } catch (e) {
    const error = e as HttpError;

    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
};
