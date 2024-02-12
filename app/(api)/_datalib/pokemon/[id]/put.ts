import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { prependAllAttributes } from '@utils/request/prependAttributes';
import isBodyEmpty from '@utils/request/isBodyEmpty';
import parseAndReplace from '@utils/request/parseAndReplace';
import {
  HttpError,
  NoContentError,
  NotFoundError,
} from '@utils/response/Errors';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = new ObjectId(params.id);
    const body = await request.json();
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }
    const parsedBody = await parseAndReplace(body);

    const db = await getDatabase();
    const pokemon = await db.collection('pokemon').updateOne(
      {
        _id: id,
      },
      parsedBody
    );

    const subDocumentUpdate = prependAllAttributes(body, 'pokemon.$[pokemon].');
    const trainer_pokemon = await db
      .collection('trainers')
      .updateMany({}, subDocumentUpdate, {
        arrayFilters: [{ 'pokemon._id': id }],
      });

    if (pokemon.matchedCount === 0) {
      throw new NotFoundError(`Pokemon with id: ${params.id} not found.`);
    }

    return NextResponse.json(
      { ok: true, body: [pokemon, trainer_pokemon] },
      { status: 200 }
    );
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status || 400 }
    );
  }
}
