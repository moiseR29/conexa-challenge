import { Account, AccountDAO } from '../../../domain';
import { Logger } from '../../../../../utils';
import AccountModel from './AccountModel';

export class MongoAccountDAO implements AccountDAO {
  private _log: Logger;

  constructor() {
    this._log = new Logger('MongoAccountDAO');
  }

  async create(account: Account): Promise<Account> {
    const newAccount = new AccountModel(account);
    await newAccount.save();
    return {
      accountId: newAccount._id,
      username: newAccount.username,
      password: '',
    };
  }

  async getById(accountId: number): Promise<Account> {
    this._log.info('Get by id --> ', accountId);
    return (await AccountModel.findOne({ _id: accountId }))!;
  }

  async getByUsername(username: string): Promise<Account> {
    this._log.info('Get by username --> ', username);
    return (await AccountModel.findOne({ username }))!;
  }

  async getAll(): Promise<Account[]> {
    this._log.info('Get all --> ');
    return await AccountModel.find({});
  }
}
