// Using require because this config file can't use ESM
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env' }); // migrate-mongo doesn't have access to automatically loaded Next.js environment files

const config = {
  mongodb: { url: process.env.MONGO_CONNECTION_STRING },
  migrationsDir: 'app/(api)/_migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
