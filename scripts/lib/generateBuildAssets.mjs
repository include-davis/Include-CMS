#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getSettings from './getSettings.mjs';
import getSchema from './getSchema.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outDir = path.join(__dirname, '../../build-assets');

export async function generateBuildAssets() {
  if (!fs.existsSync()) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  await getSettings(outDir);
  await getSchema(outDir);
}
