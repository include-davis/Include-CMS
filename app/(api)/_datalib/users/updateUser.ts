import { NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { ObjectId } from 'mongodb';
import isBodyEmpty from '@utils/request/isBodyEmpty';
import parseAndReplace from '@utils/request/parseAndReplace';
import {
  HttpError,
  NoContentError,
  NotFoundError,
} from '@utils/response/Errors';

// pass in id of user + new email/password to update (at least one must be provided)
// check if user exists in db before updating
/*
 *   Updates email & password of user in the database
 *   @param request: id: string, body: {email: string | null, password: string | null}
 *   @returns {ok: boolean, body: object | null, error: number | null}
 */
const collectionName = 'users';

export async function UpdateUser(id: string, body: object) {
  try {
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }

    const db = await getDatabase();
    const objectId = ObjectId.createFromHexString(id);
    const parsedBody = await parseAndReplace(body);

    const user = await db
      .collection(collectionName)
      .updateOne({ _id: objectId }, { $set: parsedBody });

    if (user.matchedCount === 0) {
      throw new NotFoundError(
        `Could not update user with ID: '${id}'. User does not exist or ID is incorrect.`
      );
    }

    return NextResponse.json(
      {
        ok: true,
        body: user,
        error: null,
      },
      {
        status: 200,
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
