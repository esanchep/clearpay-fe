import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { fromTransactionsActions } from '../actions';
import { RootState } from '../states';
import { Transaction } from './../../administration/transactions/transactions.models';
import { TransactionsService } from './../../administration/transactions/transactions.service';
import { ApiResponse } from './../../shared/models/response.models';

@Injectable()
export class TransactionsEffects {

  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private transactionsService: TransactionsService
  ) { }

  getTransactionsByWalletId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTransactionsActions.getTransactionsByWalletId),
      switchMap((wallet: { walletId: string; }) => this.transactionsService.getTransactionsByWallet(wallet.walletId).pipe(
        map((response: ApiResponse<Transaction[]>) => {
          if (!response.body) {
            // TODO show notification error
            return fromTransactionsActions.getTransactionsByWalletIdFailed();
          }
          return fromTransactionsActions.getTransactionsByWalletIdSuccess(response);
        })
      )),
      catchError(() => {
        // TODO show notification error
        this.store.dispatch(fromTransactionsActions.resetState());
        return of(fromTransactionsActions.getTransactionsByWalletIdFailed());
      })
    )
  );

}
