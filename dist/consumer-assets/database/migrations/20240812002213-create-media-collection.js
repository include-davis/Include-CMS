module.exports = {
  async up(db, _) {
    const mediaSchema = {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'name',
          'type',
          'format',
          'src',
          'size',
          'width',
          'height',
          '_created_at',
          '_last_modified',
        ],
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          cloudinary_id: {
            bsonType: 'string',
            description: 'Must be a string and is required',
          },
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
          alt: {
            bsonType: 'string',
            description: 'Must be a string',
          },
          size: {
            bsonType: 'int',
            description: 'Must be an integer and is required',
          },
          width: {
            bsonType: ['int', 'null'],
            description: 'Must be an integer or null',
          },
          height: {
            bsonType: ['int', 'null'],
            description: 'Must be an integer or null',
          },
          _created_at: {
            bsonType: 'string',
            description: 'must be a string and match the ISO 8601 format',
            pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z$',
          },
          _last_modified: {
            bsonType: 'string',
            description: 'must be a string and match the ISO 8601 format',
            pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z$',
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
