import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';
import path from 'path';
import prebuild from './prebuild.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config(path.join(process.cwd(), '.env'));

export default async function buildAndRun(command) {
  await prebuild();
  execSync(`next ${command}`, {
    cwd: path.join(__dirname, '../../'),
    stdio: 'inherit',
  });
}
