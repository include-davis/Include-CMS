import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { ObjectId } from 'mongodb';
import type User from '@typeDefs/auth/User';
import isBodyEmpty from '@utils/request/isBodyEmpty';
import parseAndReplace from '@utils/request/parseAndReplace';
import {
  HttpError,
  NoContentError,
  NotFoundError,
} from '@utils/response/Errors';

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
export async function updateUser(id: string, body: object) {
  try {
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }

    const db = await getDatabase();
    const objectId = ObjectId.createFromHexString(id);
    const parsedBody = await parseAndReplace(body);

    const user = await db
      .collection('users')
      .updateOne({ _id: objectId }, parsedBody);

    if (user.matchedCount === 0) {
      throw new NotFoundError(
        `Could not update user with ID: '${id}'. User does not exist or ID is incorrect.`
      );
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
