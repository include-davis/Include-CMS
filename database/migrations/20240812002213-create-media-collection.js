module.exports = {
  async up(db, _) {
    const mediaSchema = {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name', 'type', 'format', 'src', 'size', 'width', 'height'],
        properties: {
          name: {
            bsonType: 'string',
            description: 'Must be a string and is required',
          },
          type: {
            bsonType: 'string',
            description: 'Must be a string and is required',
          },
          format: {
            bsonType: 'string',
            description: 'Must be a string and is required',
          },
          src: {
            bsonType: 'string',
            description: 'Must be a string and is required',
          },
          size: {
            bsonType: 'int',
            description: 'Must be an integer and is required',
          },
          width: {
            bsonType: 'int',
            description: 'Must be an integer and is required',
          },
          height: {
            bsonType: 'int',
            description: 'Must be an integer and is required',
          },
        },
      },
    };
    await db.createCollection('media', { validator: mediaSchema });
  },

  async down(db, _) {
    await db.collection('media').drop();
  },
};
