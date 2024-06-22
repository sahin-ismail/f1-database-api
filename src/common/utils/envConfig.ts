export const getPort = () => getEnvVar<number>('PORT', 'number');
export const getNodeEnv = () => getEnvVar<string>('NODE_ENV', 'string');
export const getBasicAuthPass = () => getEnvVar<string>('BASIC_AUTH_PASS', 'string');
export const getCorsOrigin = () => getEnvVar<string>('CORS_ORIGIN', 'string');
export const getPgHost = () => getEnvVar<string>('PGHOST', 'string');
export const getPgUser = () => getEnvVar<string>('PGUSER', 'string');
export const getPgDatabase = () => getEnvVar<string>('PGDATABASE', 'string');
export const getPgPassword = () => getEnvVar<string>('PGPASSWORD', 'string');
export const getPgPort = () => getEnvVar<number>('PGPORT', 'number');

export function getEnvVar<T extends string | number>(key: string, type: 'string' | 'number'): T {
  const value = process.env[key];
  if (value == null) {
    throw new Error(`Unknown process.env.${key}: ${value}. Is your .env file setup?`);
  }

  if (type === 'number') {
    const numValue = parseInt(value);
    if (Number.isNaN(numValue)) {
      throw new Error(`process.env.${key} must be a number. Got ${value}`);
    }
    return numValue as T;
  }

  return value as T;
}
