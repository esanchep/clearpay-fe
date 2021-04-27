import { ActionReducerMap } from '@ngrx/store';
import { RootState } from './../states';
import * as fromUsersReducers from './users.reducers';
import * as fromWalletsReducers from './wallets.reducers';

const reducers: ActionReducerMap<RootState> = {
  users: fromUsersReducers.reducer,
  wallets: fromWalletsReducers.reducer
};

export {
  fromUsersReducers,
  reducers
};
