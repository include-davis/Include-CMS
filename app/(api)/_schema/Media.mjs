const Media = {
  $jsonSchema: {
    bsonType: 'object',
    title: 'Media Object Validation',
    required: ['media_type', 'name', 'media_url', 'date_added'],
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
        description: 'Media URL must be a string',
      },
      preview_url: {
        bsonType: 'string',
        description: 'Preview URL must be a string',
      },
      date_added: {
        bsonType: 'date',
        description: 'Date added must be a date',
      },
    },
  },
};

export default Media;
