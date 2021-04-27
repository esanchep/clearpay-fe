import { Action, createReducer, on } from '@ngrx/store';
import { ApiResponse } from 'src/app/shared/models/response.models';
import { User } from './../../administration/users/users.models';
import { fromUsersActions } from './../actions';
import { UsersState } from './../states';

export const INITIAL_USERS_STATE: UsersState = undefined;

const usersReducer = createReducer(
  INITIAL_USERS_STATE,
  on(
    fromUsersActions.getAllUsers,
    fromUsersActions.getAllUsersFailed,
    () => INITIAL_USERS_STATE
  ),
  on(
    fromUsersActions.getAllUsersSuccess,
    (state: UsersState, data: ApiResponse<User[]>) => ({
      userList: data.body
    })
  ),
  on(
    fromUsersActions.setSelectedUser,
    (state: UsersState, data: User) => ({ ...state, selectedUser: data })
  )
);

export function reducer(state: UsersState, action: Action): UsersState {
  return usersReducer(state, action);
}
