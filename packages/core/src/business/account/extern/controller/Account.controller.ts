import { Router } from 'express';
import { CreateAccountController } from './CreateAccountController';

export class AccountController {
  private _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  run(): Router {
    this._router.post('/account', new CreateAccountController().run);
    return this._router;
  }
}
