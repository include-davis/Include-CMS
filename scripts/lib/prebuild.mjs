import { execSync } from 'child_process';
import { generateBuildAssets } from './generateBuildAssets.mjs';
import { generateRuntimeEnvironment } from './generateRuntimeEnvironment.mjs';
import generateMigrations from './generateMigrations.mjs';

export default async function prebuild() {
  await generateRuntimeEnvironment();
  await generateBuildAssets();
  execSync('migrate-mongo up', { stdio: 'inherit' });
  await generateMigrations();
  execSync('migrate-mongo up', { stdio: 'inherit' });
}
