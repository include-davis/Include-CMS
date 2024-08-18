const media = {
  bsonType: 'object',
  title: 'Media Object Validation',
  properties: {
    _id: {
      bsonType: 'objectId',
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
    },
    date_added: {
      type: Date,
      default: Date.now,
    },
  },
};

export default media;
