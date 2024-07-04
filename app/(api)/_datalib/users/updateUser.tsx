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
