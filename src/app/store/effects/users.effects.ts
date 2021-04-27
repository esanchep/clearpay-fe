import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RootState } from '../states';
import { User } from './../../administration/users/users.models';
import { UsersService } from './../../administration/users/users.service';
import { ApiResponse } from './../../shared/models/response.models';
import { fromTransactionsActions, fromUsersActions, fromWalletsActions } from './../actions';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private usersService: UsersService
  ) { }

  getAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsersActions.getAllUsers),
      switchMap(() => this.usersService.getAllUsers().pipe(
        map((response: ApiResponse<User[]>) => {
          if (!response.body) {
            // TODO show notification error
            return fromUsersActions.getAllUsersFailed();
          }
          return fromUsersActions.getAllUsersSuccess(response);
        })
      )),
      catchError(() => {
        // TODO show notification error
        this.store.dispatch(fromWalletsActions.resetState());
        this.store.dispatch(fromTransactionsActions.resetState());
        return of(fromUsersActions.getAllUsersFailed());
      })
    )
  );

}
