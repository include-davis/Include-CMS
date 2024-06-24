import { FieldType } from './_types';

const weddings = {
  name: 'Weddings',
  fields: [
    { name: 'Title', type: FieldType.ShortText },
    { name: 'Date', type: FieldType.Date },
    { name: 'Description', type: FieldType.LongText },
    { name: 'Photo Gallery', type: FieldType.MediaList },
  ],
};

export default weddings;
