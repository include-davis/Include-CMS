import MediaItem from '@typeDefs/media/MediaItem';
import schema from '@app/_utils/schema';
import uploadMediaItem from './uploadMediaItem';
import { FieldType, Field } from '@dist/index';

interface UploadRes {
  [key: string]: {
    ok: boolean;
    body: MediaItem | null;
    error: string | null;
  }[];
}

export default async function uploadMediaList(
  content_type: string,
  data: {
    [key: string]: any;
  }
) {
  const contentSchema = schema.get(content_type);
  if (!contentSchema) {
    throw new Error(`Content type: ${content_type} does not exist.`);
  }

  const mediaFields = contentSchema
    .getFieldArray()
    .filter((field: Field) => field.type === FieldType.MEDIA_LIST)
    .map((field: Field) => field.name as string);

  const res: UploadRes = {};

  const uploadSingleList = async (mediaField: string) => {
    res[mediaField] = await Promise.all(
      data[mediaField].map(async (mediaItem: MediaItem) =>
        mediaItem.cloudinary_id
          ? { ok: true, body: mediaItem, error: null }
          : await uploadMediaItem(mediaItem)
      )
    );
  };

  await Promise.all(mediaFields.map(uploadSingleList));
  return res;
}
