import fs from 'fs';
import path from 'path';

import Fields from '../app/_configs/_schema/_fields.mjs';
import typeSchemas from '../app/_configs/_schema/_index.mjs';

function generateJsonSchema(schema) {
  const properties = {};

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

  const jsonSchema = {
    bsonType: 'object',
    properties: {
      _id: { bsonType: 'objectId' },
      ...properties,
    },
  };

  const schemaContent = `
    const ${schema.name.toLowerCase()} = ${JSON.stringify(jsonSchema, null, 2)};

    export default ${schema.name.toLowerCase()};
  `;

  return schemaContent;
}

function generateMigration(schema) {
  const collectionName = schema.name.toLowerCase();

  const migrationContent = `
    import ${collectionName} from '../_schema/${collectionName}.mjs';

    export async function up(db) {
      await db.createCollection('${collectionName}', {
        validator: {
          $jsonSchema: ${collectionName}
        },
      });
    }

    export async function down(db) {
      await db.collection('${collectionName}').drop();
    }
  `;

  return migrationContent;
}

function writeFile(path, content) {
  fs.writeFileSync(path, content);
  console.log(`File created: ${path}`);
}

for (const schema of typeSchemas) {
  const schemaName = `${schema.name.toLowerCase()}.mjs`;
  const schemaPath = path.join('app/(api)/_schema', schemaName);
  const schemaContent = generateJsonSchema(schema);

  const migrationName = `create_${schema.name.toLowerCase()}.mjs`;
  const migrationPath = path.join('app/(api)/_migrations', migrationName);
  const migrationContent = generateMigration(schema);

  writeFile(schemaPath, schemaContent);
  writeFile(migrationPath, migrationContent);
}
