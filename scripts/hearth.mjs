#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import buildAndRun from './lib/buildAndRun.mjs';

const argv = yargs(hideBin(process.argv))
  .command(
    '$0 <command>',
    'Execute a command with optional delete flag',
    (yargs) => {
      yargs.positional('command', {
        describe: 'The command to run',
        type: 'string',
      });
    }
  )
  .option('d', {
    alias: 'deleteUnused',
    type: 'boolean',
    describe: 'Enable debug mode',
    default: false,
  })
  .help().argv;

const { command, deleteUnused } = argv;
if (command) {
  buildAndRun(command, deleteUnused);
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}
