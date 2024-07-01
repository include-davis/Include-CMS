// Sample migration file for a User collection

// Use MongoDB's collMod to change a collection's JSON schema validation
// We'll be adding the email field to the schema
// Deleting the email field can be done by just swapping the up and down migrations

module.exports = {
  async up(db) {
    await db.command({
      collMod: 'users',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          properties: {
            _id: {
              bsonType: 'objectId',
              description: '_id must be an ObjectId',
            },
            name: {
              bsonType: 'string',
              description: 'name must be a string',
            },
            email: {
              bsonType: 'string',
              description: 'email must be a string',
            },
          },
        },
      },
      validationLevel: 'moderate',
    });

    await db
      .collection('users')
      .updateMany({}, { $set: { email: 'sample@gmail.com' } }); // set default values
  },

  async down(db) {
    await db.command({
      collMod: 'users',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          properties: {
            _id: {
              bsonType: 'objectId',
              description: '_id must be an ObjectId',
            },
            name: {
              bsonType: 'string',
              description: 'name must be a string',
            },
          },
        },
      },
      validationLevel: 'moderate',
    });

    await db.collection('users').updateMany({}, { $unset: { email: null } });
  },
};
