'use server';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { GetUserByEmail } from '@datalib/users/getUser';
import { UpdateUser } from '@datalib/users/updateUser';
import { HttpError } from '@utils/response/Errors';
import type { UserCredentials } from '@typeDefs/UserCredentials';
import type { User } from '@datatypes/user';

/**
 * @param body - { email: string, password: string }
 * @returns: {
 *   ok: boolean,
 *   body: boolean | null,
 *   error: number | null
 * }
 */

export async function ResetPassword(body: UserCredentials) {
  try {
    const { email, password } = body;

    // get user
    const userRes = await GetUserByEmail(email);
    const data = await userRes.json();
    const user: User = data.body;

    if (!user) {
      throw new HttpError(data.error);
    }

    // hash the user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update the user password
    const updatedUserRes = await UpdateUser(user._id, {
      $set: { password: hashedPassword },
    });

    const updatedUser = await updatedUserRes.json();
    return NextResponse.json(
      {
        ok: true,
        body: updatedUser,
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
