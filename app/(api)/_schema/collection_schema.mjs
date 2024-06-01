const Collections = {
  $jsonSchema: {
    bsonType: 'object',
    title: 'Media Object Validation',
    required: ['name', 'collection_type'],
    properties: {
      _id: {
        bsonType: 'objectId',
        description: '_id must be an ObjectId',
      },
      name: {
        bsonType: 'string',
        description: 'Name must be a string',
      },
      collection_type: {
        bsonType: 'string',
        description: 'Collection Type must be a string',
      },
      mediaList: {
        bsonType: 'array',
        items: {
          bsonType: 'string',
          description: 'Each media item must be a string',
        },
        description: 'List of media IDs',
      },
    },
  },
};

export default Collections;
