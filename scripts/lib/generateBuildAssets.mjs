#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import getSettings from './getSettings.mjs';
import getSchema from './getSchema.mjs';
import getCallbacks from './getCallbacks.mjs';

const outDir = path.join(process.cwd(), 'runtime-environment', 'build-assets');

export async function generateBuildAssets() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  await getSettings(outDir);
  await getSchema(outDir);
  await getCallbacks(outDir);
}
