import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { v2 as cloudinary } from 'cloudinary';
import schema from '@app/_utils/schema';
import { FieldType, Field } from '@dist/index';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteMediaItem(id: string) {
  try {
    const db = await getDatabase();

    const objectId = ObjectId.createFromHexString(id);
    const mediaItem = await db.collection('media').findOne({
      _id: objectId,
    });

    await cloudinary.uploader.destroy(mediaItem.cloudinary_id, {
      resource_type: mediaItem.format === 'pdf' ? 'image' : mediaItem.type,
    });

    const deleteStatus = await db.collection('media').deleteOne({
      _id: objectId,
    });

    const content_types = schema.getNames();
    await Promise.all(
      content_types.map((content_type: string) => {
        const contentSchema = schema.get(content_type);
        if (!contentSchema) {
          throw new NotFoundError(
            `Content type: ${content_type} does not exist.`
          );
        }
        const mediaFields = contentSchema
          .getFieldArray()
          .filter((field: Field) => field.type === FieldType.MEDIA_LIST)
          .map((field: Field) => field.name);

        const updatePullList: { [key: string]: any } = {};
        mediaFields.forEach((field: string) => {
          updatePullList[field] = objectId;
        });

        const mediaFieldQueries = mediaFields.map((field: string) => ({
          [field]: objectId,
        }));
        if (mediaFieldQueries.length === 0) {
          return null;
        }
        return db.collection(content_type).updateMany(
          {
            $or: mediaFieldQueries,
          },
          {
            $pull: updatePullList,
          }
        );
      })
    );

    if (deleteStatus.deletedCount === 0) {
      throw new NotFoundError(`media item with id: ${id} not found.`);
    }

    return {
      ok: true,
      body: 'media item deleted.',
      error: null,
    };
  } catch (error) {
    const e = error as HttpError;
    return {
      ok: false,
      body: null,
      error: e.message || 'Internal Server Error',
    };
  }
}
