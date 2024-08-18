const weddings = {
  bsonType: 'object',
  properties: {
    _id: {
      bsonType: 'objectId',
    },
    title: {
      bsonType: 'string',
    },
    date: {
      bsonType: 'date',
    },
    description: {
      bsonType: 'string',
    },
    photo_gallery: {
      bsonType: 'array',
      items: {
        bsonType: 'objectId',
      },
    },
    message_for_groom: {
      bsonType: 'string',
    },
    message_for_bride: {
      bsonType: 'string',
    },
    blooper_photos: {
      bsonType: 'array',
      items: {
        bsonType: 'objectId',
      },
    },
  },
};

export default weddings;
