import path from 'path';
import fs from 'fs';
import { globbySync } from 'globby';
import Hearth from '../../dist/index.js';
import { pathToFileURL } from 'url';

const { ContentSchema } = Hearth;
export default async function getSchema(outDir = '', writeOut = true) {
  try {
    const cwd = process.cwd();
    const schemaDir = path.join(cwd, 'schema');
    const files = globbySync(`${schemaDir.replaceAll('\\', '/')}/**/*`).sort();

    const contentTypes = await Promise.all(
      files.map(async (f) => {
        const schemaModule = await import(pathToFileURL(f).href);
        return schemaModule.default;
      })
    );

    const schema = new ContentSchema();
    contentTypes.forEach((contentType) =>
      schema.set(contentType.getName(), contentType)
    );
    if (writeOut) {
      const outFilePath = path.join(outDir, 'schema.json');
      fs.writeFileSync(outFilePath, JSON.stringify(schema, null, 2));
    }
    return schema;
  } catch (error) {
    console.error('Error loading configuration module:', error);
    throw error;
  }
}
