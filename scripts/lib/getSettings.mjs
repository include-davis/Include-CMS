import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';

export default async function getSettings(outDir) {
  const settingsPath = path.join(process.cwd(), 'configs', 'settings.js');
  const settingsModule = await import(pathToFileURL(settingsPath).href);
  const settings = settingsModule.default;
  const outFilePath = path.join(outDir, 'settings.json');
  fs.writeFileSync(outFilePath, JSON.stringify(settings, null, 2));
  return settings;
}
