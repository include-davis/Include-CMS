// eslint-disable-next-line @typescript-eslint/no-var-requires
const Fields = require('./_fields');
const weddings = {
  name: 'Weddings',
  fields: [
    { name: 'Title', type: Fields.ShortText },
    { name: 'Date', type: Fields.Date },
    { name: 'Description', type: Fields.LongText },
    { name: 'Photo Gallery', type: Fields.MediaList },
  ],
};

module.exports = weddings;
