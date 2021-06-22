import { Router } from 'express';
import { CreateAccountController } from './CreateAccountController';
import { FindAccountController } from './FindAccountController';
import { LoginController } from './LoginAccountController';
import { JWTMiddleware } from '../../../common/service';

export class AccountController {
  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  run(): Router {
    this._router.post('/login', new LoginController().run);
    this._router.post('/account', new CreateAccountController().run);
    this._router.get(
      '/account/:accountId?',
      [new JWTMiddleware().run],
      new FindAccountController().run,
    );
    return this._router;
  }
}
