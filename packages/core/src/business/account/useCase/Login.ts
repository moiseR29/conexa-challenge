/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AccountDAO, Account } from '../domain';
import { Logger, CryptManager } from '../../../utils';

export interface LoginData {
  accountDAO: AccountDAO;
  payload: Account;
}

export class Login {
  private _accountDAO: AccountDAO;
  private _payload: Account;
  private _log: Logger;

  constructor(data: LoginData) {
    this._accountDAO = data.accountDAO;
    this._payload = data.payload;
    this._log = new Logger('Login Use Case');
  }

  async run(): Promise<any> {
    const verifyExistsAccount = await this._accountDAO.getByUsername(
      this._payload.username,
    );

    if (!verifyExistsAccount) {
      this._log.error('Account not found');
      throw new Error('Account not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = verifyExistsAccount;

    return {
      ...rest,
      token: CryptManager.generateToken({
        accountId: rest.accountId!,
        username: rest.username,
      }),
    };
  }
}
