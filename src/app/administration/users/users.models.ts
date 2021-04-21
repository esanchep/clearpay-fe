export interface User {
  id: string;
  username: string;
  name: string;
  surname: string;
}

export interface GetUsersResponse {
  users: User[];
}
