const Media = {
  bsonType: 'Object',
  title: 'Media Object Validation',
  properties: {
    _id: {
      bsonType: 'ObjectId',
      description: '_id must be an ObjectId',
    },
    media_type: {
      bsonType: 'string',
      description: 'Media Type must be a string',
    },
    name: {
      bsonType: 'string',
      description: 'Name must be a string',
    },
    alt_text: {
      bsonType: 'string',
      description: 'Alternative text must be a string',
    },
    media_url: {
      bsonType: 'string',
      description: 'Media url must be a string',
    },
    preview_url: {
      bsonType: 'string',
      description: 'Preview url must be a string',
      required: function () {
        return this.media_type === 'video'; // Preview URL required only for videos
      },
    },
    date_added: {
      type: Date,
      default: Date.now,
    },
  },
};

export default Media;
