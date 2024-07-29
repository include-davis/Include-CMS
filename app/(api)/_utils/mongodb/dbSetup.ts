import fs from 'fs';
import path from 'path';

import Fields from '@configs/_schema/_fields';
import { Schema } from '@configs/_schema/_types';
import typeSchemas from '@configs/_schema/_index';

function generateJsonSchema(schema: Schema) {
  const properties: Record<string, any> = {};

  schema.fields.forEach((field) => {
    const fieldName = field.name.toLowerCase().replace(/\s+/g, '_');

    switch (field.type) {
      case Fields.ShortText:
      case Fields.LongText:
        properties[fieldName] = { bsonType: 'string' };
        break;
      case Fields.Date:
        properties[fieldName] = { bsonType: 'date' };
        break;
      case Fields.MediaList:
        properties[fieldName] = {
          bsonType: 'array',
          items: {
            bsonType: 'objectId',
          },
        };
        break;
    }
  });

  return {
    bsonType: 'object',
    properties: {
      _id: { bsonType: 'objectId' },
      ...properties,
    },
  };
}

function generateMigration(schema: Schema) {
  const collectionName = schema.name.toLowerCase();
  const jsonSchema = generateJsonSchema(schema);

  const migrationContent = `
    module.exports = {
      async up(db) {
        await db.createCollection('${collectionName}', {
          validator: {
            $jsonSchema: ${JSON.stringify(jsonSchema, null, 2)}
          }
        });

        await db.command({
          collMod: '${collectionName}',
          validationAction: 'error',
          validationLevel: 'strict'
        });

        await db.collection('${collectionName}').createIndex({ createdAt: 1 });
        await db.collection('${collectionName}').createIndex({ updatedAt: 1 });
      },

      async down(db) {
        await db.collection('${collectionName}').drop();
      }
    };
  `;

  return migrationContent;
}

function writeMigrationFile(schema: Schema, outputDir: string) {
  const fileName = `create_${schema.name.toLowerCase()}.js`;
  const filePath = path.join(outputDir, fileName);

  const migrationContent = generateMigration(schema);

  fs.writeFileSync(filePath, migrationContent);
  console.log(`Migration file created: ${filePath}`);
}

const outputDir = 'app/(api)/_migrations';

for (const schema of typeSchemas) {
  writeMigrationFile(schema, outputDir);
}
