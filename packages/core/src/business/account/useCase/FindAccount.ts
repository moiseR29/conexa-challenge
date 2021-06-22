/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AccountDAO, Account } from '../domain';
import { Logger } from '../../../utils';

export interface FindAccountData {
  accountDAO: AccountDAO;
  payload: {
    accountId?: string;
  };
}

export class FindAccount {
  private _accountDAO: AccountDAO;
  private _payload: { accountId?: string };
  private _log: Logger;

  constructor(data: FindAccountData) {
    this._accountDAO = data.accountDAO;
    this._payload = data.payload;
    this._log = new Logger('Find Use Case');
  }

  async run(): Promise<Account | Array<Account>> {
    let response;

    try {
      if (this._payload.accountId) {
        this._log.info('Find by id: -> ', this._payload.accountId);
        response = await this._accountDAO.getById(this._payload.accountId);
        return response!;
      }
    } catch (error) {
      this._log.error(error.message);
      throw new Error(`${this._payload.accountId} not found`);
    }

    this._log.info('Find All ');
    response = await this._accountDAO.getAll();

    return response;
  }
}
