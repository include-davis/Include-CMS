// eslint-disable-next-line @typescript-eslint/no-var-requires
const ContentType = require('./_contentType');
const weddings = new ContentType({ name: 'weddings', displayName: 'Weddings' });
weddings
  .addField({
    type: 'shortText',
    name: 'bride_name',
    displayName: "Bride's name",
  })
  .addField({
    type: 'shortText',
    name: 'groom_name',
    displayName: "Groom's name",
  })
  .addField({
    type: 'date',
    name: 'wedding_date',
    displayName: 'Wedding date',
  });

module.exports = weddings;
