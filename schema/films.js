// eslint-disable-next-line @typescript-eslint/no-var-requires
const Fields = require('./_fields');

const films = {
  name: 'Films',
  fields: [
    { name: 'Title', type: Fields.ShortText },
    { name: 'Date', type: Fields.Date },
    { name: 'Description', type: Fields.LongText },
    { name: 'Film', type: Fields.MediaList },
  ],
};

module.exports = films;
