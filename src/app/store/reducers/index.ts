import { ActionReducerMap } from '@ngrx/store';
import { RootState } from './../states';
import * as fromTransactionsReducers from './transactions.reducers';
import * as fromUsersReducers from './users.reducers';
import * as fromWalletsReducers from './wallets.reducers';

const reducers: ActionReducerMap<RootState> = {
  users: fromUsersReducers.reducer,
  wallets: fromWalletsReducers.reducer,
  transactions: fromTransactionsReducers.reducer
};

export {
  fromTransactionsReducers,
  fromUsersReducers,
  reducers
};
