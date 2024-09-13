import path from 'path';

let env: object;

export default async function getEnv() {
  try {
    const cwd = process.cwd();
    const envPath = path.join(cwd, 'configs', 'configs.js');
    const envModule = await import(envPath);
    env = envModule.default;
    return env;
  } catch (error) {
    console.error('Error loading configuration module:', error);
    throw error;
  }
}
