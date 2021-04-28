import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RootState } from '../states';
import { Literal } from './../../../assets/i18n/literals';
import { Wallet } from './../../administration/wallets/wallets.models';
import { WalletsService } from './../../administration/wallets/wallets.service';
import { NotificationService } from './../../shared/components/notification/notification.service';
import { ApiResponse } from './../../shared/models/response.models';
import { fromTransactionsActions, fromWalletsActions } from './../actions';

@Injectable()
export class WalletsEffects {

  constructor(
    private actions$: Actions,
    private notificationService: NotificationService,
    private store: Store<RootState>,
    private walletsService: WalletsService
  ) { }

  getWalletsByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromWalletsActions.getWalletsByUserId),
      switchMap((user: { userId: string; }) => this.walletsService.getWalletsByUserId(user.userId).pipe(
        map((response: ApiResponse<Wallet[]>) => {
          if (!response.body) {
            this.notificationService.error(Literal.administration.wallets.errorGettingWallets);
            return fromWalletsActions.getWalletsByUserIdFailed();
          }
          return fromWalletsActions.getWalletsByUserIdSuccess(response);
        })
      )),
      catchError(() => {
        this.notificationService.error(Literal.administration.wallets.errorGettingWallets);
        this.store.dispatch(fromWalletsActions.resetState());
        this.store.dispatch(fromTransactionsActions.resetState());
        return of(fromWalletsActions.getWalletsByUserIdFailed());
      })
    )
  );

}
