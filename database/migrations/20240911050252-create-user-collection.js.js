module.exports = {
  async up(db, _) {
    const userSchema = {
      $jsonSchema: {
        bsonType: 'object',
        required: ['email', 'password'],
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          email: {
            bsonType: 'string',
            description: 'Must be a string and is required',
          },
          password: {
            bsonType: 'string',
            description: 'Must be a string and is required',
          },
        },
      },
    };
    await db.createCollection('users', { validator: userSchema });
  },

  async down(db, _) {
    await db.collection('users').drop();
  },
};
