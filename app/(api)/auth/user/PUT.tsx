'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { ObjectId } from 'mongodb';

// pass in id of user + new email/password to update (at least one must be provided)
// check if user exists in db before updating
/*
 *   Updates email & password of user in the database
 *   @param request: {_id: string, email: string | null, password: string | null}
 *   @returns {ok: boolean, body: {_id: string, email: string, password: string, updatedCount: number}, error: string}
 */
const collectionName = 'users';

export async function PUT(request: NextRequest) {
  try {
    const db = await getDatabase();
    const { _id, email, password } = await request.json();
    const userId = ObjectId.createFromHexString(_id);

    // check if user exists
    const user = await db.collection(collectionName).findOne({ _id: userId });

    // user doesn't exist, so can't update
    if (!user) {
      throw new NotFoundError(
        'User not found, cannot update non-existent user'
      );
    }

    // retain old email + password if not provided
    const newEmail = email || user.email;
    const newPassword = password || user.password;

    // update user
    const updatedUser = await db
      .collection(collectionName)
      .updateOne(
        { _id: userId },
        { $set: { email: newEmail, password: newPassword } }
      );

    return NextResponse.json({
      ok: true,
      body: {
        _id,
        email: newEmail as string,
        password: newPassword as string,
        updatedCount: updatedUser.modifiedCount as number,
      },
      error: null,
    });
  } catch (e) {
    const error = e as HttpError;
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
}
