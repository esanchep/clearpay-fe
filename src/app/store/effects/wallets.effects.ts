import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Wallet } from 'src/app/administration/wallets/wallets.models';
import { WalletsService } from 'src/app/administration/wallets/wallets.service';
import { fromWalletsActions } from './../actions';
import { ApiResponse } from './../../shared/models/response.models';

@Injectable()
export class WalletsEffects {

  constructor(
    private actions$: Actions,
    private walletsService: WalletsService
  ) { }

  getWalletsByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromWalletsActions.getWalletsByUserId),
      switchMap((user: { userId: string; }) => this.walletsService.getWalletsByUserId(user.userId).pipe(
        map((response: ApiResponse<Wallet[]>) => fromWalletsActions.getWalletsByUserIdSuccess(response))
      )),
      catchError(() => {
        // TODO show notification error
        return of(fromWalletsActions.getWalletsByUserIdFailed());
      })
    )
  );

}
