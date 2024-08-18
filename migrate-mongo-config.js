// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env' });

const config = {
  mongodb: { url: process.env.MONGO_CONNECTION_STRING },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.mjs',
  useFileHash: false,
  // moduleSystem: 'esm',
};

module.exports = config;
