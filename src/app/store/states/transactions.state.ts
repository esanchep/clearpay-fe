import { Transaction } from './../../administration/transactions/transactions.models';

export interface TransactionsState {
  transactionList: Transaction[];
}
