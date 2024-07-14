import { NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { ObjectId } from 'mongodb';

const collectionName = 'users';

/**
 *   Retrieves a user from the database by ID or Email
 *   @param query - ID/Email of User
 *   @returns: {
 *     ok: boolean,
 *     body: object | null,
 *     error: number | null
 *   }
 */
export async function GetUserByIdOrEmail(query: string) {
  try {
    const db = await getDatabase();
    const userQuery = query.includes('@')
      ? { email: query }
      : { _id: ObjectId.createFromHexString(query) };
    const user = await db.collection(collectionName).findOne(userQuery);

    if (!user) {
      throw new NotFoundError(`Could not retrieve user. Invalid ID or Email.`);
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

/**
 *   Retrieves matched user(s) from database based on specified query
 *   @param query - Object with key-value pairs to filter user(s) by (i.e { email: "example@gmail.com" })
 *   @returns: {
 *     ok: boolean,
 *     body: User[] | null,
 *     error: number | null
 *   }
 */
export async function GetUser(query: object) {
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
