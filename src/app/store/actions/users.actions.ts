import { createAction, props } from '@ngrx/store';
import { User } from '../../administration/users/users.models';
import { ApiResponse } from '../../shared/models/response.models';

export const UserAction = {
  GET_ALL_USERS: '[Users] Get all users',
  GET_ALL_USERS_SUCCESS: '[Users] Get all users success',
  GET_ALL_USERS_FAILURE: '[Users] Get all users failure',
  SET_SELECTED_USER: '[Users] Set selected user'
};

export const getAllUsers = createAction(
  UserAction.GET_ALL_USERS
);

export const getAllUsersSuccess = createAction(
  UserAction.GET_ALL_USERS_SUCCESS,
  props<ApiResponse<User[]>>()
);

export const getAllUsersFailure = createAction(
  UserAction.GET_ALL_USERS_FAILURE
);

export const setSelectedUser = createAction(
  UserAction.SET_SELECTED_USER,
  props<User>()
);
