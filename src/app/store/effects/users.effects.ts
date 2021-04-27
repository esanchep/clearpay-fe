import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/administration/users/users.models';
import { UsersService } from './../../administration/users/users.service';
import { ApiResponse } from './../../shared/models/response.models';
import { fromUsersActions } from './../actions';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) { }

  getAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsersActions.getAllUsers),
      switchMap(() => this.usersService.getAllUsers().pipe(
        map((response: ApiResponse<User[]>) => fromUsersActions.getAllUsersSuccess(response))
      )),
      catchError(() => {
        // TODO show notification error
        return of(fromUsersActions.getAllUsersFailed());
      })
    )
  );

}
