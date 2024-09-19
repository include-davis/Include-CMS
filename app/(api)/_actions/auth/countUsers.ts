'use server';
import { getDatabase } from '@app/(api)/_utils/mongodb/mongoClient.mjs';
import HttpError from '@app/(api)/_utils/response/HttpError';

export async function CountUsers() {
  try {
    const db = await getDatabase();
    const userCount = await db.collection('users').countDocuments();
    return {
      ok: true,
      body: userCount,
      error: null,
    };
  } catch (e) {
    const err = e as HttpError;
    return {
      ok: false,
      body: null,
      error: err.message || 'Internal Server Error',
    };
  }
}
