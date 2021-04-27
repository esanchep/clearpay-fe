import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/administration/users/users.models';
import { UsersService } from '../../administration/users/users.service';
import { fromUserActions } from '../actions';
import { ApiResponse } from './../../shared/models/response.models';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) { }

  getAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserActions.getAllUsers),
      switchMap(() => this.usersService.getAllUsers().pipe(
        map((response: ApiResponse<User[]>) => fromUserActions.getAllUsersSuccess(response))
      )),
      catchError(() => {
        // TODO show notification error
        return of(fromUserActions.getAllUsersFailure());
      })
    )
  );

}
