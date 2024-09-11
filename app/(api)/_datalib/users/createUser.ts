import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import type User from '@typeDefs/auth/User';
import isBodyEmpty from '@utils/request/isBodyEmpty';
import parseAndReplace from '@utils/request/parseAndReplace';
import {
  HttpError,
  NoContentError,
  DuplicateError,
} from '@utils/response/Errors';

/**
 *   Adds new user in the database.
 *   @param body - {
 *     email: string,
 *     password: string
 *   }
 *   @returns: {
 *     ok: boolean,
 *     body: User | null,
 *     error: number | null
 *   }
 */
export async function createUser(body: object) {
  try {
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }

    const db = await getDatabase();
    const parsedBody = await parseAndReplace(body);

    const existingUser = await db.collection('users').findOne({
      email: parsedBody.email,
    });

    if (existingUser) {
      throw new DuplicateError(
        `Email: '${parsedBody.email}' already in use. Please try again with a different email.`
      );
    }

    const createdUser = await db.collection('users').insertOne(parsedBody);
    const user = await db.collection('users').findOne({
      _id: createdUser.insertedId,
    });

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
