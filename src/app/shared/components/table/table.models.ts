import { Transaction } from '../../../administration/transactions/transactions.models';
import { User } from '../../../administration/users/users.models';
import { Wallet } from '../../../administration/wallets/wallets.models';

export type TableEntity = User | Wallet | Transaction;

export interface Row {
  index: number;
  data: TableEntity;
}

export interface Column {
  id: string;
  label: string;
}
