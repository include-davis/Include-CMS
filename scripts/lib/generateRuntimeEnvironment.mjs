import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generateRuntimeEnvironment() {
  const src = path.join(__dirname, '../', '../');
  const dest = path.join(process.cwd(), 'runtime-environment');
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  fs.rmSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}
