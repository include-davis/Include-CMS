const { ContentType, FieldType } = require('@include/hearth');

const weddings = new ContentType({name: 'weddings', singularDisplayName: 'Wedding', pluralDisplayName: 'Weddings'});
weddings
.createField({
  name: 'bride_name',
  displayName: "Bride's Name",
  type: FieldType.SHORT_TEXT,
  required: true,  
})
.createField({
  name: 'groom_name',
  displayName: "Groom's Name",
  type: FieldType.SHORT_TEXT,
  required: true,  
})

module.exports = weddings;