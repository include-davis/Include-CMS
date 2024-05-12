const Media = {
  bsonType: 'object',
  title: 'Pokemon Object Validation',
  properties: {
    _id: {
      bsonType: 'objectId',
      description: '_id must be an ObjectId',
    },
    name: {
      bsonType: 'string',
      description: 'name must be a string',
    },
    alt_text: {
      bsonType: 'string',
      description: "alt_text must be a string",
    },
    media_url: {
      bsonType: 'string',
      description: "media_url must be a string",
    },
    date: {
      bsonType: "NOT SURE",
    }
  },
  additionalProperties: false,
};

export default Media;
