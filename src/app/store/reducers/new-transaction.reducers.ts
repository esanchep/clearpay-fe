import { Action, createReducer, on } from '@ngrx/store';
import { fromNewTransactionActions } from '../actions';
import { User } from './../../administration/users/users.models';
import { Wallet } from './../../administration/wallets/wallets.models';
import { ApiResponse } from './../../shared/models/response.models';
import { NewTransactionState } from './../states/new-transaction.state';

export const INITIAL_NEW_TRANSACTION_STATE: NewTransactionState = undefined;

const newTransactionReducer = createReducer(
  INITIAL_NEW_TRANSACTION_STATE,
  on(
    fromNewTransactionActions.resetState,
    fromNewTransactionActions.addNewTransactionSuccess,
    fromNewTransactionActions.addNewTransactionFailed,
    () => INITIAL_NEW_TRANSACTION_STATE
  ),
  on(
    fromNewTransactionActions.setSourceUser,
    (state: NewTransactionState, data: User) => ({
      ...state,
      sourceUser: data
    })
  ),
  on(
    fromNewTransactionActions.setSourceWallet,
    (state: NewTransactionState, data: Wallet) => ({
      ...state,
      sourceWallet: data
    })
  ),
  on(
    fromNewTransactionActions.addNewTransaction,
    (state: NewTransactionState) => ({ ...state })
  ),
  on(
    fromNewTransactionActions.getDestinationWalletsByUserIdSuccess,
    (state: NewTransactionState, data: ApiResponse<Wallet[]>) => ({
      ...state,
      destinationWallets: data.body
    })
  ),
  on(
    fromNewTransactionActions.resetDestinationWallets,
    fromNewTransactionActions.getDestinationWalletsByUserId,
    fromNewTransactionActions.getDestinationWalletsByUserIdFailed,
    (state: NewTransactionState) => ({
      ...state,
      destinationWallets: undefined
    })
  )
);

export function reducer(state: NewTransactionState, action: Action): NewTransactionState {
  return newTransactionReducer(state, action);
}
