import path from 'path';
import fs from 'fs';
import { globbySync } from 'globby';
import Hearth from '../../dist/index.js';

const { ContentSchema } = Hearth;
export default async function getSchema(outDir) {
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

    const outFilePath = path.join(outDir, 'schema.json');
    fs.writeFileSync(outFilePath, JSON.stringify(schema, null, 2));
    return schema;
  } catch (error) {
    console.error('Error loading configuration module:', error);
    throw error;
  }
}
