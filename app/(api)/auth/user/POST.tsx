'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError } from '@utils/response/Errors';

// pass in email + password in body to create new user
// check if the user exists in the db before creating
/*
 *   Adds new user in the database
 *   @param request: {email: string, password: string}
 *   @returns {ok: boolean, body: {email: string, password: string, _id: string}, error: string}
 */
const collectionName = 'users';

export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase();
    const { email, password } = await request.json();

    // check if user is already in the db
    const userExists = await db
      .collection(collectionName)
      .findOne({ email, password });

    // user already exists, so no duplicate creation
    if (userExists) {
      throw new HttpError('User already exists, cannot create duplicate user');
    }

    // create new user
    const user = await db
      .collection(collectionName)
      .insertOne({ email, password });

    return NextResponse.json(
      {
        ok: true,
        body: {
          _id: user.insertedId as string,
          email,
          password,
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
