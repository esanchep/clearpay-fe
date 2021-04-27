import { createSelector } from '@ngrx/store';
import { RootState } from '../states';
import { NewTransactionState } from './../states/new-transaction.state';

export const newTransactionSelectors = (state: RootState) => state?.newTransaction;

export const selectNewTransaction = createSelector(
  newTransactionSelectors,
  (state: NewTransactionState) => state
);

export const selectEligibleDestinationWallets = createSelector(
  newTransactionSelectors,
  (state: NewTransactionState) => state?.destinationWallets
);
