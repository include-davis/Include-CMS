import { Schema } from '@configs/_schema/_types';
import { FieldType } from '@datatypes/schema';

function mapToBsonType(fieldType: FieldType): string {
  switch (fieldType.name) {
    case 'shortText':
    case 'longText':
      return 'string';
    case 'date':
      return 'date';
    case 'mediaList':
      return 'array';
    default:
      return 'string'; // default to string for unknown types
  }
}

export default function generateTypes(schema: Schema) {
  const properties: { [key: string]: any } = {
    _id: {
      bsonType: 'objectId',
      description: '_id must be an ObjectId',
    },
  };

  for (const field of schema.fields) {
    const property: { [key: string]: any } = {
      bsonType: mapToBsonType(field.type),
      description: `${field.name} must be a ${field.type.name}`,
    };

    if (field.type.name === 'mediaList') {
      property.items = {
        bsonType: 'objectId',
        description: 'Elements must be ObjectIds',
      };
    }

    properties[field.name.toLowerCase()] = property;
  }

  return {
    bsonType: 'object',
    title: `${schema.name} Object Validation`,
    properties,
  };
}
