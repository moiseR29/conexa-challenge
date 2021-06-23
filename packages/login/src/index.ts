import config from './config';
import { App, Router, Middlewares } from './server';
import { Logger } from './utils';

const Log: Logger = new Logger('Index');

export const preparedServer = (): App => {
  const server = new App();
  server.addServerMiddlewares(new Middlewares(server.app));
  server.addMainRouter(new Router().router);
  return server;
};

const main = async () => {
  try {
    await preparedServer().start(config.server.port);
  } catch (error) {
    Log.error(error);
    process.exit(1);
  }
};

main();
