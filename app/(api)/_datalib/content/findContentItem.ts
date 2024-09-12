import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { ObjectId } from 'mongodb';
import schema from '@app/_utils/schema';

export async function findContentItem(content_type: string, id: string) {
  try {
    const db = await getDatabase();
    const contentSchema = schema[content_type];
    const mediaFieldExpansionSteps = contentSchema
      .getFieldArray()
      .filter((field) => field.type === 'mediaList')
      .map((field) => ({
        $lookup: {
          from: 'media',
          localField: field.name,
          foreignField: '_id',
          as: field.name,
        },
      }));

    const contentItem = await db
      .collection(content_type)
      .aggregate([
        {
          $match: {
            _id: ObjectId.createFromHexString(id),
          },
        },
        ...mediaFieldExpansionSteps,
      ])
      .next();

    if (!contentItem) {
      throw new NotFoundError(`No Items ${id} found in ${content_type}`);
    }

    return { ok: true, body: contentItem, error: null };
  } catch (e) {
    const error = e as HttpError;
    return {
      ok: false,
      body: null,
      error: error.message || 'Internal Server Error',
    };
  }
}

export async function findContentItems(
  content_type: string,
  query: object = {}
) {
  try {
    const db = await getDatabase();
    const contentSchema = schema[content_type];
    const mediaFieldExpansionSteps = contentSchema
      .getFieldArray()
      .filter((field) => field.type === 'mediaList')
      .map((field) => ({
        $lookup: {
          from: 'media',
          localField: field.name,
          foreignField: '_id',
          as: field.name,
        },
      }));

    const contentItems = await db
      .collection(content_type)
      .aggregate([
        {
          $match: query,
        },
        ...mediaFieldExpansionSteps,
      ])
      .toArray();

    return {
      ok: true,
      body: JSON.parse(JSON.stringify(contentItems)),
      error: null,
    };
  } catch (e) {
    const error = e as HttpError;
    return {
      ok: false,
      body: null,
      error: error.message || 'Internal Server Error',
    };
  }
}
