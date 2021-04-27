import { User } from './../../administration/users/users.models';
import { Wallet } from './../../administration/wallets/wallets.models';

export interface NewTransactionState {
  sourceUser: User;
  sourceWallet: Wallet;
}
