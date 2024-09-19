import path from 'path';
import fs from 'fs';

export default async function getCallbacks(outDir) {
  const callbacksPath = path.join(process.cwd(), 'configs', 'callbacks.js');
  const outFilePath = path.join(outDir, 'callbacks.js');
  fs.copyFileSync(callbacksPath, outFilePath);
}
