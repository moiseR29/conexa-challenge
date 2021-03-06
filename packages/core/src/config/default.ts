import { Config } from './config';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname.split('/build')[0]}/.env` });

export const DefaultConfig: Config = {
  database: {
    user: 'conexauser',
    password: 'password',
    db: 'conexa',
    host: 'mongo',
    port: 27017,
  },
  session: {
    salt: 10,
    secret: 'supersecretisimo',
  },
  server: {
    port: 8080,
    basePath: '/api',
    env: 'develop',
    accessToken: 'conexa',
  },
};
