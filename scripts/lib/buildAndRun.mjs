import dotenv from 'dotenv';
import { spawn } from 'child_process';
import path from 'path';
import prebuild from './prebuild.mjs';

dotenv.config(path.join(process.cwd(), '.env'));
export default async function buildAndRun(command) {
  await prebuild();
  const child = spawn('npm', ['run', command], {
    cwd: path.join(process.cwd(), 'runtime-environment'),
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', process.exit);
}
