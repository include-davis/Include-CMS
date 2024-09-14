import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { spawn } from 'child_process';
import path from 'path';
import prebuild from './prebuild.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config(path.join(process.cwd(), '.env'));

export default async function buildAndRun(command) {
  await prebuild();
  const child = spawn('next', [command], {
    cwd: path.join(__dirname, '../../'),
    stdio: 'inherit',
  });

  child.on('exit', process.exit);
}
