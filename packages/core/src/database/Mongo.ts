import { ConnectOptions, connect } from 'mongoose';
import config from '../config';
import { Logger } from '../utils';

export class Mongo {
  private _log: Logger;

  constructor() {
    this._log = new Logger('Mongo Connection');
  }

  private generateMongoConfig(): ConnectOptions {
    return {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
  }

  async start(): Promise<void> {
    const { db, port, host, password, user } = config.database;
    const url = `mongodb://${user}:${password}@${host}:${port}/${db}?authSource=admin`;
    const mongoInstance = await connect(url, this.generateMongoConfig());
    const mongo = mongoInstance.connection;
    mongo.once('open', () => {
      this._log.info('Mongo Connection Stablished');
    });

    mongo.on('error', (err) => {
      this._log.error('Mongodb Connection error: ', err);
      process.exit();
    });
  }
}
