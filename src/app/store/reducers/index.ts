import { ActionReducerMap } from '@ngrx/store';
import { RootState } from './../states';
import * as fromNewTransactionReducers from './new-transaction.reducers';
import * as fromTransactionsReducers from './transactions.reducers';
import * as fromUsersReducers from './users.reducers';
import * as fromWalletsReducers from './wallets.reducers';

const reducers: ActionReducerMap<RootState> = {
  users: fromUsersReducers.reducer,
  wallets: fromWalletsReducers.reducer,
  transactions: fromTransactionsReducers.reducer,
  newTransaction: fromNewTransactionReducers.reducer
};

export {
  fromTransactionsReducers,
  fromUsersReducers,
  reducers
};
