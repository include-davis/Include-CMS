module.exports = {
  async up(db) {
    await db.createCollection('weddings', {
      validator: {
        $jsonSchema: {
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
        },
      },
    });

    await db.command({
      collMod: 'weddings',
      validationAction: 'error',
      validationLevel: 'strict',
    });

    await db.collection('weddings').createIndex({ createdAt: 1 });
    await db.collection('weddings').createIndex({ updatedAt: 1 });
  },

  async down(db) {
    await db.collection('weddings').drop();
  },
};
