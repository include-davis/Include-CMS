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
const collectionName = 'users';

/**
 *   Updates user fields specified by the caller
 *   @param id - ID of user to update
 *   @param body - JSON object of fields with updated values
 *   @returns: {
 *     ok: boolean,
 *     body: User | null,
 *     error: number | null
 *   }
 */
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
