import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUsersResponse, User } from './users.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly USERS: User[] = [
    {
      id: Math.random().toString(),
      name: 'John',
      surname: 'Connor',
      username: 'terminator'
    },
    {
      id: Math.random().toString(),
      name: 'Tina',
      surname: 'Turner',
      username: 'the_mask'
    },
    {
      id: Math.random().toString(),
      name: 'Tony',
      surname: 'Stark',
      username: 'iron_man'
    },
    {
      id: Math.random().toString(),
      name: 'Iñigo',
      surname: 'Montoya',
      username: 'the_princess_bride'
    },
    {
      id: Math.random().toString(),
      name: 'John',
      surname: 'James',
      username: 'rambo'
    },
    {
      id: Math.random().toString(),
      name: 'Stephen',
      surname: 'Strange',
      username: 'dr_strange'
    },
    {
      id: Math.random().toString(),
      name: 'David',
      surname: '???',
      username: 'solid_snake'
    },
    {
      id: Math.random().toString(),
      name: 'John',
      surname: '???',
      username: 'big_boss'
    }
  ];

  constructor() { }

  getAllUsers(): Observable<GetUsersResponse> {
    const response: GetUsersResponse = {
      users: this.USERS
    };
    return new Observable(subscriber => {
      setTimeout(() => subscriber.next(response), 0);
    });
  }
}
