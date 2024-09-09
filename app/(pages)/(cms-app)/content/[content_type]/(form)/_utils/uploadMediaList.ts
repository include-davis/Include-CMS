import MediaItem from '@app/_types/media/media';
import schema from '@app/_utils/schema';
import uploadMediaItem from './uploadMediaItem';

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
  const contentSchema = schema[content_type];
  const mediaFields = contentSchema
    .getFieldArray()
    .filter((field) => field.type === 'mediaList')
    .map((field) => field.name as string);

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
