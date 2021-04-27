import { ActionReducerMap } from '@ngrx/store';
import { RootState } from '../states';
import * as fromUsersReducers from './users.reducers';

const reducers: ActionReducerMap<RootState> = {
  users: fromUsersReducers.reducer
};

export {
  fromUsersReducers,
  reducers
};
