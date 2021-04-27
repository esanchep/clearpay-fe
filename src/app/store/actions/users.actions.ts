import { createAction, props } from '@ngrx/store';
import { User } from './../../administration/users/users.models';
import { ApiResponse } from './../../shared/models/response.models';

const USERS = '[Users]';

export const UserAction = {
  RESET_STATE: `${USERS} Reset State`,
  GET_ALL_USERS: `${USERS} Get all users`,
  GET_ALL_USERS_SUCCESS: `${USERS} Get all users success`,
  GET_ALL_USERS_FAILED: `${USERS} Get all users failed`,
  SET_SELECTED_USER: `${USERS} Set selected user`
};

export const resetState = createAction(
  UserAction.RESET_STATE
);

export const getAllUsers = createAction(
  UserAction.GET_ALL_USERS
);

export const getAllUsersSuccess = createAction(
  UserAction.GET_ALL_USERS_SUCCESS,
  props<ApiResponse<User[]>>()
);

export const getAllUsersFailed = createAction(
  UserAction.GET_ALL_USERS_FAILED
);

export const setSelectedUser = createAction(
  UserAction.SET_SELECTED_USER,
  props<User>()
);
