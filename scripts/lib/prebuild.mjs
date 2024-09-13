import { generateBuildAssets } from './generateBuildAssets.mjs';
import { execSync } from 'child_process';

export default async function prebuild() {
  await generateBuildAssets();
  execSync('migrate-mongo up', { stdio: 'inherit' });
}
