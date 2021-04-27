import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Transaction } from './../../administration/transactions/transactions.models';
import { TransactionsService } from './../../administration/transactions/transactions.service';
import { Wallet } from './../../administration/wallets/wallets.models';
import { WalletsService } from './../../administration/wallets/wallets.service';
import { ApiResponse } from './../../shared/models/response.models';
import { fromNewTransactionActions, fromTransactionsActions } from './../actions';
import { RootState } from './../states';

@Injectable()
export class NewTransactionEffects {

  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private transactionsService: TransactionsService,
    private walletsService: WalletsService
  ) { }

  getDestinationWalletsByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNewTransactionActions.getDestinationWalletsByUserId),
      switchMap((user: { userId: string; }) => this.walletsService.getWalletsByUserId(user.userId).pipe(
        map((response: ApiResponse<Wallet[]>) => {
          if (!response.body) {
            // TODO show notification error
            return fromNewTransactionActions.getDestinationWalletsByUserIdFailed();
          }
          return fromNewTransactionActions.getDestinationWalletsByUserIdSuccess(response);
        })
      )),
      catchError(() => {
        // TODO show notification error
        return of(fromNewTransactionActions.getDestinationWalletsByUserIdFailed());
      })
    )
  );

  addNewTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNewTransactionActions.addNewTransaction),
      switchMap((newTransaction: Transaction) => this.transactionsService.addNewTransaction(newTransaction).pipe(
        map((response: ApiResponse<Transaction>) => {
          this.store.dispatch(fromTransactionsActions.addTransactionToList(response.body));
          if (!response.body) {
            // TODO show notification error
            return fromNewTransactionActions.addNewTransactionFailed();
          }
          return fromNewTransactionActions.addNewTransactionSuccess(response);
        })
      )),
      catchError(() => {
        // TODO show notification error
        return of(fromNewTransactionActions.addNewTransactionFailed());
      })
    )
  );

}