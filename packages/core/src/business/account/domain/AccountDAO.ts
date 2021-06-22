import {Account} from './Account';

export interface AccountDAO {
  create(account: Account): Promise<Account>;
  getById(accountId: number): Promise<Account>;
  getByUsername(username: string): Promise<Account>;
  getAll(): Promise<Array<Account>>;
}