// Sample migration file for a User collection

// Use MongoDB's collMod to change a collection's JSON schema validation
// We'll be renaming the name field to fullName

export async function up(db) {
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
          fullName: {
            bsonType: 'string',
            description: 'name must be a string',
          },
        },
      },
    },
    validationLevel: 'moderate',
  });
  await db
    .collection('users')
    .updateMany({}, { $rename: { name: 'fullName' } });
}

export async function down(db) {
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
  await db
    .collection('users')
    .updateMany({}, { $rename: { fullName: 'name' } });
}
