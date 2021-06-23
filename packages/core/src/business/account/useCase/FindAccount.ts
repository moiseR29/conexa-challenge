/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AccountDAO, Account } from '../domain';
import { Logger } from '../../../utils';

export interface FindAccountData {
  accountDAO: AccountDAO;
  payload: {
    account: string;
    limit: number;
    offset: number;
  };
}

export class FindAccount {
  private _accountDAO: AccountDAO;
  private _payload: { account?: string; limit: number; offset: number };
  private _log: Logger;

  constructor(data: FindAccountData) {
    this._accountDAO = data.accountDAO;
    this._payload = data.payload;
    this._log = new Logger('Find Use Case');
  }

  async run(): Promise<Account | Array<Account>> {
    let response;

    try {
      if (this._payload.account) {
        this._log.info('Find by : -> ', this._payload.account);
        response = await this._accountDAO.getByUsername(this._payload.account);
        return response!;
      }
    } catch (error) {
      this._log.error(error.message);
      throw new Error(`${this._payload.account} not found`);
    }

    this._log.info('Find All ');
    response = await this._accountDAO.getAll(
      this._payload.limit,
      this._payload.offset,
    );

    return response;
  }
}
