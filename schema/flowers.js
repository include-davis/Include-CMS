// eslint-disable-next-line @typescript-eslint/no-var-requires
const Fields = require('./_fields');
const flowers = {
  name: 'Flowers',
  fields: [
    { name: 'Name', type: Fields.ShortText },
    { name: 'Date', type: Fields.Date },
    { name: 'Description', type: Fields.LongText },
  ],
};

module.exports = flowers;
