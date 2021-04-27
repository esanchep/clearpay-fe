import { NewTransactionState } from './new-transaction.state';
import { TransactionsState } from './transactions.state';
import { UsersState } from './users.state';
import { WalletsState } from './wallets.state';

export interface RootState {
  users: UsersState;
  wallets: WalletsState;
  transactions: TransactionsState;
  newTransaction: NewTransactionState;
}
