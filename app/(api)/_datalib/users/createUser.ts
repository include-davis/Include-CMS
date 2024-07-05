import { NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import isBodyEmpty from '@utils/request/isBodyEmpty';
import parseAndReplace from '@utils/request/parseAndReplace';
import {
  HttpError,
  NoContentError,
  DuplicateError,
} from '@utils/response/Errors';

// pass in email + password in body to create new user
// check if the user exists in the db before creating
/*
 *   Adds new user in the database
 *   @param request: {email: string, password: string}
 *   @returns {ok: boolean, body: {_id: ObjectId, username: string, password: string} | null, error: number | null}
 */
const collectionName = 'users';

export async function CreateUser(body: object) {
  try {
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }

    const parsedBody = await parseAndReplace(body);
    const db = await getDatabase();

    const userExists = await db.collection(collectionName).findOne({
      email: parsedBody.email,
    });

    if (userExists) {
      throw new DuplicateError(
        `Email: '${parsedBody.email}' already in use. Please try again with a different email.`
      );
    }

    const createdUser = await db
      .collection(collectionName)
      .insertOne(parsedBody);
    const user = await db.collection(collectionName).findOne({
      _id: createdUser.insertedId,
    });

    return NextResponse.json(
      {
        ok: true,
        body: user,
        error: null,
      },
      {
        status: 201,
      }
    );
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      {
        ok: false,
        body: null,
        error: error.message,
      },
      {
        status: error.status || 400,
      }
    );
  }
}
