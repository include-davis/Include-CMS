import Fields from './_fields';

const weddings = {
  name: 'Weddings',
  fields: [
    { name: 'Title', type: Fields.ShortText },
    { name: 'Date', type: Fields.Date },
    { name: 'Description', type: Fields.LongText },
    { name: 'Photo Gallery', type: Fields.MediaList },
    { name: 'Message for Groom', type: Fields.LongText },
    { name: 'Message for Bride', type: Fields.LongText },
    { name: 'Blooper Photos', type: Fields.MediaList },
  ],
};

export default weddings;
