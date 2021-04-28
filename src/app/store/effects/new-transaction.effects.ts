import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Literal } from 'src/assets/i18n/literals';
import { Transaction } from './../../administration/transactions/transactions.models';
import { TransactionsService } from './../../administration/transactions/transactions.service';
import { Wallet } from './../../administration/wallets/wallets.models';
import { WalletsService } from './../../administration/wallets/wallets.service';
import { NotificationService } from './../../shared/components/notification/notification.service';
import { ApiResponse } from './../../shared/models/response.models';
import { fromNewTransactionActions, fromTransactionsActions } from './../actions';
import { RootState } from './../states';

@Injectable()
export class NewTransactionEffects {

  constructor(
    private actions$: Actions,
    private notificationService: NotificationService,
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
            this.notificationService.error(Literal.administration.newTransaction.errorGettingWallets);
            return fromNewTransactionActions.getDestinationWalletsByUserIdFailed();
          }
          return fromNewTransactionActions.getDestinationWalletsByUserIdSuccess(response);
        })
      )),
      catchError(() => {
        this.notificationService.error(Literal.administration.newTransaction.errorGettingWallets);
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
            this.notificationService.error(Literal.administration.newTransaction.errorAddingNewTransaction);
            return fromNewTransactionActions.addNewTransactionFailed();
          }
          this.notificationService.success(Literal.administration.newTransaction.transactionHasBeenSuccessfullyAdded);
          return fromNewTransactionActions.addNewTransactionSuccess(response);
        })
      )),
      catchError(() => {
        this.notificationService.error(Literal.administration.newTransaction.errorAddingNewTransaction);
        return of(fromNewTransactionActions.addNewTransactionFailed());
      })
    )
  );

}
