import path from 'path';
import fs from 'fs';
import { globbySync } from 'globby';
import Hearth from '@include/hearth';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { ContentSchema } = Hearth;
export default async function getSchema() {
  try {
    const cwd = process.cwd();
    const schemaDir = path.join(cwd, 'schema');
    const files = globbySync(`${schemaDir}/**/*`).sort();

    const contentTypes = await Promise.all(
      files.map(async (f) => {
        const schemaModule = await import(f);
        return schemaModule.default;
      })
    );

    const schema = new ContentSchema();
    contentTypes.forEach((contentType) =>
      schema.set(contentType.getName(), contentType)
    );

    const outFilePath = path.join(
      __dirname,
      '../../build-assets',
      'schema.json'
    );
    fs.writeFileSync(outFilePath, JSON.stringify(schema, null, 2));
    return schema;
  } catch (error) {
    console.error('Error loading configuration module:', error);
    throw error;
  }
}
