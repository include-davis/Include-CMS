import { execSync } from 'child_process';
import { globbySync } from 'globby';
import path from 'path';
import fs from 'fs';
import generateMigrationSteps from './generateMigrationSteps.mjs';

export default async function generateMigrations() {
  const [collectionsToDelete, collectionsToUpdate, collectionsToCreate] =
    await generateMigrationSteps();

  if (
    collectionsToDelete.length +
      collectionsToUpdate.length +
      collectionsToCreate.length ===
    0
  ) {
    return;
  }

  const migrationsDir = path.join(process.cwd(), 'database', 'migrations');
  execSync('migrate-mongo create update-content-types', { stdio: 'inherit' });
  const migrationFilePath = globbySync(`${migrationsDir}/**/*`).sort().pop();
  const upDeleteStep = collectionsToDelete
    .map(
      ({ name }) => `
      await db.collection("${name}").drop();`
    )
    .join('');

  const upUpdateStep = collectionsToUpdate
    .map(
      ({ name, newValidator }) => `
      await db.command({
        collMod: "${name}",
        validator: ${prettyPrintJSON(newValidator, 4)}
      });`
    )
    .join('');

  const upCreateStep = collectionsToCreate
    .map(
      ({ name, newValidator }) => `
      await db.createCollection("${name}", {
        validator: ${prettyPrintJSON(newValidator, 4)}
      });`
    )
    .join('');

  const downDeleteStep = collectionsToDelete
    .map(
      ({ name, oldValidator }) => `
      await db.createCollection("${name}", {
        validator: ${prettyPrintJSON(oldValidator, 4)}
      });`
    )
    .join('');

  const downUpdateStep = collectionsToUpdate
    .map(
      ({ name, oldValidator }) => `
      await db.command({
        collMod: "${name}",
        validator: ${prettyPrintJSON(oldValidator, 4)}
      });`
    )
    .join('');

  const downCreateStep = collectionsToCreate
    .map(
      ({ name }) => `
      await db.collection("${name}").drop();`
    )
    .join('');

  const migrationCode = `
  module.exports = {
    async up(db, client) {
      // delete step ${upDeleteStep}

      // update step ${upUpdateStep}

      // create step ${upCreateStep}
    },
    async down(db, client) {
      // delete step ${downDeleteStep}

      // update step ${downUpdateStep}
      
      // create step ${downCreateStep}    
    }
  };
  `;
  fs.writeFileSync(migrationFilePath, migrationCode);
}

function prettyPrintJSON(json, indents, keepFirstLine = true) {
  const jsonString = JSON.stringify(json, null, 2);
  const indent = '  '.repeat(indents);
  const indentedJsonString = jsonString
    .split('\n')
    .map((line, index) => (index === 0 && keepFirstLine ? line : indent + line))
    .join('\n');

  return indentedJsonString;
}
