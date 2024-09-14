import dotenv from 'dotenv';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import prebuild from './prebuild.mjs';

dotenv.config(path.join(process.cwd(), '.env'));
export default async function buildAndRun(command) {
  await prebuild();
  const child = spawn('next', [command], {
    cwd: path.join(process.cwd(), 'runtime-environment'),
    stdio: 'inherit',
  });

  child.on('exit', (code) => {
    if (command === 'build') {
      const src = path.join(process.cwd(), 'runtime-environment', 'build');
      const dest = path.join(process.cwd(), 'build');
      fs.cpSync(src, dest, {recursive: true});
    }
    process.exit(code);
  });
}
