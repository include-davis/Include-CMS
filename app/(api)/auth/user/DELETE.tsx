'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { ObjectId } from 'mongodb';

// pass in id of user to delete
// check if user exists in db before deleting
/*
 *   Removes existing user in database
 *   @param request: {_id: string}
 *   @returns {ok: boolean, body: {_id: string, email: string, password: string, removedCount: number}, error: string}
 */
const collectionName = 'users';

export async function DELETE(request: NextRequest) {
  try {
    const db = await getDatabase();
    const { _id } = await request.json();
    const userId = ObjectId.createFromHexString(_id);

    // check if user exists in the db
    const user = await db.collection(collectionName).findOne({ _id: userId });

    // user doesn't exist, so nothing to delete
    if (!user) {
      throw new NotFoundError(
        'User not found, cannot delete non-existent user'
      );
    }

    // delete user from db
    const removedUser = await db
      .collection(collectionName)
      .deleteOne({ _id: userId });

    return NextResponse.json(
      {
        ok: true,
        body: {
          _id,
          email: user.email as string,
          password: user.password as string,
          removedCount: removedUser.deletedCount as number,
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
