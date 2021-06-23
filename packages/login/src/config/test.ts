import { Config } from './config';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname.split('/build')[0]}/.env` });

export const TestConfig: Config = {
  coreApi: {
    key: '',
    domain: '',
  },
  session: {
    salt: 10,
    secret: 'supersecretisimo',
  },
  server: {
    port: 8080,
    basePath: '/api',
    env: 'test',
    accessToken: 'egg',
  },
};
