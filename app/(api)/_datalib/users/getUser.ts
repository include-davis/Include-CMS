import { NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { ObjectId } from 'mongodb';

/*
 *   Retrieves user in the database
 *   @param request: id: string
 *   @returns {ok: boolean, body: { _id: string, email: string, password: string} | null, error: number | null}
 */
const collectionName = 'users';

export async function GetUser(id: string) {
  try {
    const db = await getDatabase();
    const objectId = ObjectId.createFromHexString(id);

    const user = await db.collection(collectionName).findOne({
      _id: objectId,
    });

    if (!user) {
      throw new NotFoundError(
        `Could not retrieve user with ID: '${id}'. User does not exist or ID is incorrect.`
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

/*
 *   Retrieves multiple users in the database
 *   @param query: object
 *   @returns {ok: boolean, body: [{ _id: string, email: string, password: string}] | null, error: number | null}
 */
export async function GetManyUsers(query: object = {}) {
  try {
    const db = await getDatabase();
    const users = await db.collection(collectionName).find(query).toArray();

    return NextResponse.json(
      {
        ok: true,
        body: users,
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
