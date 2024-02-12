import { type NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import NotFoundError from '@utils/response/NotFoundError';
import { HttpError } from '@utils/response/Errors';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = new ObjectId(params.id);
    const db = await getDatabase();

    const pokemon = await db.collection('pokemon').findOne({
      _id: id,
    });

    if (pokemon === null) {
      throw new NotFoundError(`Pokemon with id: ${params.id} not found.`);
    }

    return NextResponse.json({ ok: true, body: pokemon }, { status: 200 });
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status || 400 }
    );
  }
}
