#!/usr/bin/env node
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');
const args = process.argv.slice(2);

const commands = {
  dev: 'next dev',
  build: 'next build',
  start: 'next start',
  'migrate:up': 'migrate-mongo up',
  'migrate:down': 'migrate-mongo down',
  'build-assets': 'build-assets',
};

const command = args[0];
const script = commands[command];

if (script) {
  execSync(script, { stdio: 'inherit' });
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
