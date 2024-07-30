module.exports = {
  async up(db) {
    await db.createCollection('films', {
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
            film: {
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
      collMod: 'films',
      validationAction: 'error',
      validationLevel: 'strict',
    });

    await db.collection('films').createIndex({ createdAt: 1 });
    await db.collection('films').createIndex({ updatedAt: 1 });
  },

  async down(db) {
    await db.collection('films').drop();
  },
};
