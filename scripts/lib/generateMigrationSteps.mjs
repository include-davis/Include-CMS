import { MongoClient } from 'mongodb';
import { FieldType } from '../../dist/index.js';
import getSchema from './getSchema.mjs';

export default async function generateMigrationSteps(deleteUnused) {
  const currentValidators = await getCurrentValidators();
  const newValidators = await getNewValidators();
  const currentCollectionNames = Object.keys(currentValidators);
  const newCollectionNames = Object.keys(newValidators);

  const collectionsToDelete = deleteUnused
    ? currentCollectionNames
        .filter((name) => !newCollectionNames.includes(name))
        .map((name) => ({
          name,
          oldValidator: currentValidators[name],
          newValidator: null,
        }))
    : [];

  const collectionsToUpdate = currentCollectionNames
    .filter(
      (name) =>
        newCollectionNames.includes(name) &&
        JSON.stringify(currentValidators[name]) !==
          JSON.stringify(newValidators[name])
    )
    .map((name) => ({
      name,
      oldValidator: currentValidators[name],
      newValidator: newValidators[name],
    }));

  const collectionsToCreate = newCollectionNames
    .filter((name) => !currentCollectionNames.includes(name))
    .map((name) => ({
      name,
      oldValidator: null,
      newValidator: newValidators[name],
    }));

  return [collectionsToDelete, collectionsToUpdate, collectionsToCreate];
}

async function getCurrentValidators() {
  const db = new MongoClient(process.env.MONGO_CONNECTION_STRING).db();
  const collections = await db.listCollections().toArray();
  return (
    Object.fromEntries(
      await Promise.all(
        collections
          .filter(
            ({ name }) => !['users', 'media', 'migrations'].includes(name)
          )
          .map(async ({ name }) => {
            const collection = db.collection(name);
            const validator = await collection
              .options()
              .then((opts) => opts.validator || {});
            return [name, validator];
          })
      )
    ) || {}
  );
}

async function getNewValidators() {
  const schema = await getSchema('', false);
  const typeMapping = {
    [FieldType.SHORT_TEXT]: {
      bsonType: 'string',
      description: 'Must be a string and is required',
    },
    [FieldType.LONG_TEXT]: {
      bsonType: 'string',
      description: 'Must be a string and is required',
    },
    [FieldType.DATE]: {
      bsonType: 'string',
      description: 'must be a string and match the ISO 8601 format',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z$',
    },
    [FieldType.MEDIA_LIST]: {
      bsonType: 'array',
      items: {
        bsonType: 'objectId',
      },
    },
    [FieldType.BOOLEAN]: {
      bsonType: 'bool',
    },
  };

  const contentTypes = schema.getNames();
  return Object.fromEntries(
    contentTypes.map((contentType) => {
      const contentSchema = schema.get(contentType);
      const fields = contentSchema.getFieldArray();
      const requiredFields = fields
        .filter((field) => field.required)
        .map((field) => field.name);

      const validator = {
        $jsonSchema: {
          bsonType: 'object',
          required: requiredFields,
          properties: {
            _id: {
              bsonType: 'objectId',
            },
            _name: typeMapping.shortText,
            _published: typeMapping.boolean,
            _created_at: typeMapping.date,
            _last_modified: typeMapping.date,
            ...Object.fromEntries(
              fields.map((field) => [field.name, typeMapping[field.type]])
            ),
          },
        },
      };
      return [contentType, validator];
    })
  );
}
