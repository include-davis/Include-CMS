'use server';
import bcrypt from 'bcryptjs';
import { findUserByEmail } from '@datalib/users/findUser';
import { updateUser } from '@datalib/users/updateUser';
import { HttpError } from '@utils/response/Errors';
import type UserCredentials from '@typeDefs/auth/UserCredentials';

/**
 * @param body - { email: string, password: string }
 * @returns: {
 *   ok: boolean,
 *   body: User | null,
 *   error: number | null
 * }
 */

export async function resetPassword(body: UserCredentials) {
  try {
    const { email, password } = body;

    // get user
    const userRes = await findUserByEmail(email);
    const user = userRes.body;

    if (!user) {
      throw new HttpError(userRes.error || '');
    }

    // hash the user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update the user password
    const updatedUserRes = await updateUser(user._id, {
      $set: { password: hashedPassword },
    });

    return {
      ok: true,
      body: updatedUserRes,
      error: null,
    };
  } catch (e) {
    const error = e as HttpError;
    return { ok: false, body: null, error: error.message };
  }
}
