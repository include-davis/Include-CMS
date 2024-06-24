import { FieldType } from './_types';

const films = {
  name: 'Films',
  fields: [
    { name: 'Title', type: FieldType.ShortText },
    { name: 'Date', type: FieldType.Date },
    { name: 'Description', type: FieldType.LongText },
    { name: 'Film', type: FieldType.MediaItem },
  ],
};

export default films;
