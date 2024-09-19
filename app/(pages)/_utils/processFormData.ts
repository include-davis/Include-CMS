import uploadMediaList from './uploadMediaList';
import MediaItem from '@typeDefs/media/MediaItem';
import schema from '@app/_utils/schema';
import { FieldType, Field } from '@dist/index';

export default async function processFormData(
  content_type: string,
  data: {
    [key: string]: any;
  },
  dataSetter: (value: any) => void
) {
  const uploadedMedia = await uploadMediaList(content_type, data);
  const clientDataValue = structuredClone(data);

  const contentSchema = schema.get(content_type);
  if (!contentSchema) {
    throw new Error(`Content type: ${content_type} does not exist.`);
  }

  const mediaFields = contentSchema
    .getFieldArray()
    .filter(
      (field: Field) =>
        field.type === FieldType.MEDIA_LIST && !field.name.startsWith('_')
    )
    .map((field: Field) => field.name);

  let uploadSuccess = true;
  // convert local mediaItems to uploaded mediaItems
  mediaFields.forEach(
    (mediaField: string) =>
      (clientDataValue[mediaField] = data[mediaField].map(
        (mediaItem: MediaItem, index: number) => {
          const uploadedItem = uploadedMedia[mediaField][index].body;
          if (uploadedItem) {
            return uploadedItem;
          } else {
            uploadSuccess = false;
            return mediaItem;
          }
        }
      ))
  );

  dataSetter(clientDataValue);

  // convert dates to iso time and mediaItems to _ids
  const serverDataValue = structuredClone(clientDataValue);
  const dateFields = contentSchema
    .getFieldArray()
    .filter(
      (field: Field) =>
        field.type === FieldType.DATE && !field.name.startsWith('_')
    )
    .map((field: Field) => field.name);

  mediaFields.forEach(
    (mediaField: string) =>
      (serverDataValue[mediaField] = {
        '*convertIds': {
          ids: clientDataValue[mediaField].map(
            (mediaItem: MediaItem) => mediaItem._id
          ),
        },
      })
  );

  dateFields.forEach(
    (dateField: string) =>
      (serverDataValue[dateField] = new Date(
        clientDataValue[dateField]
      ).toISOString())
  );

  return [clientDataValue, serverDataValue, uploadSuccess];
}
