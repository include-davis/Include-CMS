#!/usr/bin/env node
import buildAndRun from './lib/hearth.mjs';
const args = process.argv.slice(2);

const command = args[0];
if (command) {
  buildAndRun(command);
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
