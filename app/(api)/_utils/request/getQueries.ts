import { type NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';

export default function getQueries(request: NextRequest) {
  const query_entries = request.nextUrl.searchParams.entries();
  const output: { [key: string]: string | ObjectId } = {};
  for (const [key, val] of query_entries) {
    if (key.endsWith('_id')) {
      output[key] = ObjectId.createFromHexString(val);
      continue;
    }
    output[key] = val;
  }
  return output;
}
