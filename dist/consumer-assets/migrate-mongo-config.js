/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: './.env' });
const config = {
  mongodb: {
    url: process.env.MONGO_CONNECTION_STRING,
  },
  migrationsDir: './database/migrations',
  changelogCollectionName: 'migrations',
  migrationFileExtension: '.js',
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
