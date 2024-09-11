import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { ObjectId } from 'mongodb';

/**
 *   Removes an existing user in database
 *   @param id - ID of user to delete
 *   @returns: {
 *     ok: boolean,
 *     body: null,
 *     error: string | null
 *   }
 */
export async function deleteUser(id: string) {
  try {
    const db = await getDatabase();
    const objectId = ObjectId.createFromHexString(id);

    const deletion = await db.collection('users').deleteOne({
      _id: objectId,
    });

    if (deletion.deletedCount === 0) {
      throw new NotFoundError(
        `Could not delete user with ID: '${id}'. User does not exist or ID is incorrect.`
      );
    }

    return {
      ok: true,
      body: null,
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
