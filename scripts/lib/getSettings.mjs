import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function getSettings() {
  const settingsPath = path.join(process.cwd(), 'configs', 'settings.js');
  const settingsModule = await import(settingsPath);
  const settings = settingsModule.default;

  const outFilePath = path.join(
    __dirname,
    '../../build-assets',
    'settings.json'
  );
  fs.writeFileSync(outFilePath, JSON.stringify(settings, null, 2));
  return settings;
}
