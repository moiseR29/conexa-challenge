/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AccountDAO, Account } from '../domain';
import { Logger, CryptManager } from '../../../utils';

export interface CreateAccountData {
  accountDAO: AccountDAO;
  payload: Account;
}

export class CreateAccount {
  private _accountDAO: AccountDAO;
  private _payload: Account;
  private _log: Logger;

  constructor(data: CreateAccountData) {
    this._accountDAO = data.accountDAO;
    this._payload = data.payload;
    this._log = new Logger('Create Account Use Case');
  }

  async run(): Promise<{ username: string }> {
    const verifyExistsAccount = await this._accountDAO.getByUsername(
      this._payload.username,
    );

    if (verifyExistsAccount) {
      this._log.error('Account already exists');
      throw new Error('Account already exists');
    }

    const passwordCrypt = await CryptManager.hash(this._payload.password);

    const accountCreated = await this._accountDAO.create({
      username: this._payload.username,
      password: passwordCrypt,
    });
    this._log.info('Account Created');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = accountCreated;

    return {
      ...rest,
    };
  }
}
