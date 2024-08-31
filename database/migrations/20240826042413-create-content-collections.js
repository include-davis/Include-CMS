// eslint-disable-next-line @typescript-eslint/no-var-requires
const schema = require('../../schema/_index.js');

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

const baseFields = {
  _id: {
    bsonType: 'objectId',
  },
  $name: typeMapping.shortText,
  $description: typeMapping.shortText,
  created_at: typeMapping.date,
  last_modified: typeMapping.date,
};

const contentTypes = Object.keys(schema);

module.exports = {
  async up(db, _) {
    contentTypes.forEach(async (contentType) => {
      const fields = schema[contentType].getFields();
      const fieldNames = Object.keys(fields);
      const generatedProps = {};
      fieldNames.forEach((fieldName) => {
        generatedProps[fieldName] = typeMapping[fields[fieldName].type];
      });

      const requiredFields = fieldNames.filter(
        (fieldName) => fields[fieldName].required
      );

      const generatedSchema = {
        $jsonSchema: {
          bsonType: 'object',
          required: [...Object.keys(baseFields), ...requiredFields],
          properties: {
            ...baseFields,
            ...generatedProps,
          },
        },
      };

      const contentTypeName = schema[contentType].getName();
      await db.createCollection(contentTypeName, {
        validator: generatedSchema,
      });
    });
  },

  async down(db, _) {
    contentTypes.forEach(async (contentType) => {
      const contentTypeName = schema[contentType].getName();
      await db.collection(contentTypeName).drop();
    });
  },
};
