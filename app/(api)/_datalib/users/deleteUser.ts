import { NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { ObjectId } from 'mongodb';

/*
 *   Removes existing user in database if exists
 *   @param request: id: string
 *   @returns {ok: boolean, body: null, error: number | null}
 */
const collectionName = 'users';

export async function DeleteUser(id: string) {
  try {
    const db = await getDatabase();
    const objectId = ObjectId.createFromHexString(id);

    const deletion = await db.collection(collectionName).deleteOne({
      _id: objectId,
    });

    if (deletion.deletedCount === 0) {
      throw new NotFoundError(
        `Could not delete user with ID: '${id}'. User does not exist or ID is incorrect.`
      );
    }

    return NextResponse.json(
      {
        ok: true,
        body: null,
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
