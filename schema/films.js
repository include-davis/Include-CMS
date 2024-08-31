// eslint-disable-next-line @typescript-eslint/no-var-requires
const ContentType = require('./_contentType');

const films = new ContentType({ name: 'films', displayName: 'Films' });
films
  .addField({ type: 'shortText', name: 'name', displayName: 'Name' })
  .addField({
    type: 'longText',
    name: 'description',
    displayName: 'Description',
  })
  .addField({ type: 'date', name: 'end_date', displayName: 'End date' });

module.exports = films;
