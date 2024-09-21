import { NextRequest } from 'next/server';
import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { ObjectId } from 'mongodb';

function typeCast(value: string, type: string) {
  switch (type) {
    case 'int':
      return isNaN(+value) ? value : +value;
    case 'objectId':
      try {
        return ObjectId.createFromHexString(value);
      } catch {
        return value;
      }
    case 'bool':
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      } else {
        return value;
      }
    default:
      return value;
  }
}

export default async function getQueries(
  request: NextRequest,
  content_type: string
) {
  const db = await getDatabase();
  const query_entries = request.nextUrl.searchParams.entries();
  const schema = (await db.listCollections({ name: content_type }).toArray())[0]
    .options.validator;

  const output: { [key: string]: any } = {};
  for (const [key, val] of query_entries) {
    output[key] = typeCast(val, schema.$jsonSchema.properties[key]?.bsonType);
  }
  return output;
}
