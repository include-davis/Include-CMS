import Fields from './_fields';
import { Schema } from './_types';

const films: Schema = {
  name: 'Films',
  fields: [
    { name: 'Title', type: Fields.ShortText },
    { name: 'Date', type: Fields.Date },
    { name: 'Description', type: Fields.LongText },
    { name: 'Film', type: Fields.MediaList },
  ],
};

export default films;
