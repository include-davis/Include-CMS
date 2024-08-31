// eslint-disable-next-line @typescript-eslint/no-var-requires
const schema = require('../../schema/_index.js');

const toLowerCaseSnakeCase = (name) => {
  return name.toLowerCase().split(' ').join('_');
};

const typeMapping = {
  shortText: {
    bsonType: 'string',
    description: 'Must be a string and is required',
  },
  longText: {
    bsonType: 'string',
    description: 'Must be a string and is required',
  },
  date: {
    bsonType: 'string',
    description: 'must be a string and match the ISO 8601 format',
    pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$',
  },
  mediaItem: {
    bsonType: 'objectId',
  },
  mediaList: {
    bsonType: 'array',
    items: {
      bsonType: 'objectId',
    },
  },
};

const collections = Object.keys(schema);
const collectionSchemas = collections.map((c) => schema[c]);

module.exports = {
  async up(db, _) {
    collectionSchemas.forEach(async (collectionSchema) => {
      const fields = collectionSchema.fields;
      const fieldNames = fields.map((f) => toLowerCaseSnakeCase(f.name));
      const generatedProps = {};
      fields.forEach((field) => {
        generatedProps[toLowerCaseSnakeCase(field.name)] =
          typeMapping[field.type.name];
      });
      const generatedSchema = {
        $jsonSchema: {
          bsonType: 'object',
          required: fieldNames,
          properties: {
            _id: {
              bsonType: 'objectId',
            },
            ...generatedProps,
          },
        },
      };

      const collectionName = toLowerCaseSnakeCase(collectionSchema.name);
      await db.createCollection(collectionName, { validator: generatedSchema });
    });
  },

  async down(db, _) {
    collectionSchemas.forEach(async (collectionSchema) => {
      const collectionName = toLowerCaseSnakeCase(collectionSchema.name);
      await db.collection(collectionName).drop();
    });
  },
};
