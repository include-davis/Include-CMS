import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { ObjectId } from 'mongodb';
import type User from '@typeDefs/auth/User';

/**
 *   Retrieves a user from the database by id
 *   @param query - ID of User
 *   @returns: {
 *     ok: boolean,
 *     body: object | null,
 *     error: number | null
 *   }
 */
export async function findUser(id: string) {
  try {
    const db = await getDatabase();
    const objectId = ObjectId.createFromHexString(id);
    const user = await db.collection('users').findOne({ _id: objectId });

    if (!user) {
      throw new NotFoundError(`Could not retrieve user. Invalid ID.`);
    }

    return {
      ok: true,
      body: user as User,
      error: null,
    };
  } catch (e) {
    const error = e as HttpError;
    return {
      ok: false,
      body: null,
      error: error.message,
    };
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
export async function findUsers(query: object) {
  try {
    const db = await getDatabase();
    const users = await db.collection('users').find(query).toArray();

    return {
      ok: true,
      body: users as User[],
      error: null,
    };
  } catch (e) {
    const error = e as HttpError;
    return {
      ok: false,
      body: null,
      error: error.message,
    };
  }
}

/**
 *   Retrieves a user from the database by email
 *   @param query - Email of User
 *   @returns: {
 *     ok: boolean,
 *     body: object | null,
 *     error: number | null
 *   }
 */
export async function findUserByEmail(email: string) {
  try {
    const db = await getDatabase();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      throw new NotFoundError(`Could not retrieve user. Invalid Email.`);
    }

    return {
      ok: true,
      body: user as User,
      error: null,
    };
  } catch (e) {
    const error = e as HttpError;
    return {
      ok: false,
      body: null,
      error: error.message,
    };
  }
}
