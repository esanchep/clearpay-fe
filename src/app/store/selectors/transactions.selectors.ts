import { createSelector } from '@ngrx/store';
import { RootState } from './../states';
import { TransactionsState } from './../states/transactions.state';

export const transactionsSelectors = (state: RootState) => state?.transactions;

export const selectAllTransactions = createSelector(
  transactionsSelectors,
  (state: TransactionsState) => state?.transactionList
);
