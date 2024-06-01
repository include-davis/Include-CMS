import { getClient } from '@utils/mongodb/mongoClient.mjs';
import { HttpError } from '@utils/response/Errors';
import { NextResponse } from 'next/server';

export async function createMediaItem(inputData: object) {
  //TODO: QUESTION is type of inputData now okay, if not could you please specify its exact type
  try {
    const client = await getClient();
    const db = client.db;
    const reqCollection = await db.getCollection('Media');
    const reqDocument = await db.collection(reqCollection).insertOne(inputData);
    return { ok: true, body: reqDocument, error: null };
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
}
