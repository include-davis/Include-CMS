import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { ObjectId } from 'mongodb';

// pass in id of user to delete
// check if user exists in db before deleting
/*
 *   Removes existing user in database
 *   @param request: {_id: string}
 *   @returns {ok: boolean, body: {_id: string, email: string, password: string, removedCount: number}, error: string}
 */
const collectionName = 'users';
