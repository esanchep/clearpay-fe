import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Wallet } from './../../administration/wallets/wallets.models';
import { WalletsService } from './../../administration/wallets/wallets.service';
import { ApiResponse } from './../../shared/models/response.models';
import { fromNewTransactionActions } from './../actions';
import { RootState } from './../states';

@Injectable()
export class NewTransactionEffects {

  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private walletsService: WalletsService
  ) { }

  getDestinationWalletsByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNewTransactionActions.getDestinationWalletsByUserId),
      switchMap((user: { userId: string; }) => this.walletsService.getWalletsByUserId(user.userId).pipe(
        map((response: ApiResponse<Wallet[]>) => fromNewTransactionActions.getDestinationWalletsByUserIdSuccess(response))
      )),
      catchError(() => {
        // TODO show notification error
        return of(fromNewTransactionActions.getDestinationWalletsByUserIdFailed());
      })
    )
  );

}
