'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { ObjectId } from 'mongodb';

// get user info based on id
// check if user exists in db before returning
// querying might be a bit scuffed as we have to put it in the url
/*
 *   Retrieves user in the database
 *   @param request: ?id=string in query url
 *   @returns {ok: boolean, body: { _id: string, email: string, password: string}, error: string}
 */
const collectionName = 'users';

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const _id = request.nextUrl.searchParams.get('id') as string;
    const userId = ObjectId.createFromHexString(_id);

    // get user info
    const user = await db.collection(collectionName).findOne({ _id: userId });

    // user does not exist in db
    if (!user) {
      throw new NotFoundError(
        'User not found, cannot retrieve non-existent user'
      );
    }

    return NextResponse.json(
      {
        ok: true,
        body: {
          _id,
          email: user.email as string,
          password: user.password as string,
        },
        error: null,
      },
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
