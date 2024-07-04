import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { ObjectId } from 'mongodb';

// get user info based on id
// check if user exists in db before returning
// querying might be a bit scuffed as we have to put it in the url
/*
 *   Retrieves user in the database
 *   @param request: ?id=string in query url
 *   @returns {ok: boolean, body: { _id: string, email: string, password: string}, error: string}
 */
const collectionName = 'users';
