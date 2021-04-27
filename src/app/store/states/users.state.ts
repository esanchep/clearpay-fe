import { User } from './../../administration/users/users.models';

export interface UsersState {
  userList: User[];
  selectedUser?: User;
}
