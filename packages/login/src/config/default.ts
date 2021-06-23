import { Config } from './config';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname.split('/build')[0]}/.env` });

export const DefaultConfig: Config = {
  coreApi: {
    key: '$2b$10$Kz1gvbn.hXGaOM21y7Pf0.boB017ZUtzQTDVolk0PTH/fugMnqdZC',
    domain: 'http://core:8080',
  },
  session: {
    salt: 10,
    secret: 'supersecretisimo',
  },
  server: {
    port: 8090,
    basePath: '/api',
    env: 'develop',
    accessToken: 'conexa',
  },
};
