import { Account, AccountDAO } from '../../../domain';
import { Logger } from '../../../../../utils';
import AccountModel from './AccountModel';

const format = (data: any): Account => ({
  accountId: data._id,
  username: data.username,
  password: '',
});

export class MongoAccountDAO implements AccountDAO {
  private _log: Logger;

  constructor() {
    this._log = new Logger('MongoAccountDAO');
  }

  async create(account: Account): Promise<Account> {
    const newAccount = new AccountModel(account);
    await newAccount.save();
    return format(newAccount);
  }

  async getById(accountId: number): Promise<Account | null> {
    this._log.info('Get by id --> ', accountId);
    const account = await AccountModel.findById(accountId);
    return account ? format(account) : account!;
  }

  async getByUsername(username: string): Promise<Account | null> {
    this._log.info('Get by username --> ', username);
    const account = await AccountModel.findOne({
      username: username.toLowerCase(),
    });
    return account ? format(account) : account;
  }

  async getAll(limit: number, offset: number): Promise<Account[]> {
    this._log.info('Get all --> ');
    const result = await AccountModel.find({})
      .limit(limit * 1)
      .skip((offset - 1) * limit)
      .exec();
    return result.map(format);
  }
}
