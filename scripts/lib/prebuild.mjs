import { generateBuildAssets } from './generateBuildAssets.mjs';
import { execSync } from 'child_process';
import generateMigrations from './generateMigrations.mjs';

export default async function prebuild() {
  await generateBuildAssets();
  await generateMigrations();
  execSync('migrate-mongo up', { stdio: 'inherit' });
}
