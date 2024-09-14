const { ContentType, FieldType } = require('@include/hearth');

const films = new ContentType({name: 'films', singularDisplayName: 'Film', pluralDisplayName: 'Films'});
films
.createField({
  name: 'photo_gallery',
  displayName: "Photos",
  type: FieldType.MEDIA_LIST,
  required: true,  
})

module.exports = films;