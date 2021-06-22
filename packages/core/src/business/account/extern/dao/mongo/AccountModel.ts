import { model, Schema, Document } from 'mongoose';
import { Account } from '../../../domain';

export interface IAccount extends Account, Document {}

const AccountSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model<IAccount>('Account', AccountSchema);
