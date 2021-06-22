/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Request,
  Response,
  NextFunction,
  Router as ExpressRouter,
} from 'express';
import { HTTP_STATUS, Logger } from '../utils';
import config from '../config';
import { AccountController } from '../business/account/extern';
import { AccessKeyMiddleware } from '../business/common/service';

export class Router {
  private _router: ExpressRouter;
  private _log: Logger;

  constructor() {
    this._router = ExpressRouter();
    this._log = new Logger('Router');
    this.configure();
  }

  get router(): ExpressRouter {
    return this._router;
  }

  private configure(): void {
    this.addHealtyEndoint();
    this.applyEndpoint();
    this.notExistsEndpoint();
  }

  private addHealtyEndoint(): void {
    this._log.info('Apply route -> /');
    this._router.get(
      '/',
      [new AccessKeyMiddleware().run],
      (_req: Request, res: Response, _next: NextFunction) => {
        return res
          .status(HTTP_STATUS.OK)
          .send('Welcome to Conexa-Challenge Server');
      },
    );
  }

  private applyEndpoint(): void {
    this._log.info(`Apply route -> ${config.server.basePath}/account`);
    this._router.use(
      config.server.basePath,
      [new AccessKeyMiddleware().run],
      new AccountController(this._router).run(),
    );
  }

  private notExistsEndpoint(): void {
    this._log.info('Apply route -> *');
    this._router.use(
      '*',
      [new AccessKeyMiddleware().run],
      (_req: Request, res: Response, _next: NextFunction) => {
        return res.status(HTTP_STATUS.NOT_FOUND).send('Not Found endpoint');
      },
    );
  }
}
