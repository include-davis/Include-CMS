import { cache } from 'react';

import { NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError } from '@utils/response/Errors';

export const getPokemon = cache(async (queries: object = {}) => {
  try {
    const db = await getDatabase();

    const pokemon = await db.collection('pokemon').find(queries).toArray();

    return NextResponse.json({ ok: true, body: pokemon }, { status: 200 });
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: error.status || 400 }
    );
  }
});
