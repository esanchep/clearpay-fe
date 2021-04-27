import { createSelector } from '@ngrx/store';
import { User } from '../../administration/users/users.models';
import { RootState, UsersState } from '../states';

export const usersSelectors = (state: RootState) => state.users;

export const selectAllUsers = createSelector(
  usersSelectors,
  (state: UsersState) => state?.userList
);

export const selectAllUsersButSelectedUser = createSelector(
  usersSelectors,
  (state: UsersState) => state.userList.filter((user: User) => user.id !== state.selectedUser?.id)
);
