import { Account } from './Account';

export interface AccountDAO {
  create(account: Account): Promise<Account>;
  getById(accountId: number | string): Promise<Account | null>;
  getByUsername(username: string): Promise<Account | null>;
  getAll(limit: number, offset: number): Promise<Array<Account>>;
}
