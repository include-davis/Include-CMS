import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { NotFoundError } from '@utils/response/Errors';
import parseAndReplace from '@utils/request/parseAndReplace';
import { NextResponse } from 'next/server';

export async function updateMediaItem(query = {}, update = {}) {
  const parsedQuery = await parseAndReplace(query);
  try {
    const db = await getDatabase();
    const reqCollection = await db.collection('media');
    const reqDocument = await reqCollection.findOneAndUpdate(
      parsedQuery,
      update
    );

    if (!reqDocument || reqDocument.length === 0) {
      throw new NotFoundError(`No Items Found.`);
    }

    return NextResponse.json({ ok: true, body: reqDocument, error: null });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        {
          ok: false,
          body: null,
          error: { code: error.status, message: error.message },
        },
        { status: error.status }
      );
    } else {
      return NextResponse.json(
        {
          ok: false,
          body: null,
          error: { code: 500, message: 'Internal Server Error' },
        },
        { status: 500 }
      );
    }
  }
}
