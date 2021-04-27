import { createAction, props } from '@ngrx/store';
import { Transaction } from './../../administration/transactions/transactions.models';
import { User } from './../../administration/users/users.models';
import { Wallet } from './../../administration/wallets/wallets.models';
import { ApiResponse } from './../../shared/models/response.models';

const NEW_TRANSACTION = '[New Transaction]';

export const NewTransactionAction = {
  RESET_STATE: `${NEW_TRANSACTION} Reset State`,
  SET_SOURCE_USER: `${NEW_TRANSACTION} Set source User`,
  SET_SOURCE_WALLET: `${NEW_TRANSACTION} Set source Wallet`,
  ADD_NEW_TRANSACTION: `${NEW_TRANSACTION} Add new Transaction`,
  ADD_NEW_TRANSACTION_SUCCESS: `${NEW_TRANSACTION} Add new Transaction success`,
  ADD_NEW_TRANSACTION_FAILED: `${NEW_TRANSACTION} Add new Transaction failed`,
};

export const resetState = createAction(
  NewTransactionAction.RESET_STATE
);

export const setSourceUser = createAction(
  NewTransactionAction.SET_SOURCE_USER,
  props<User>()
);

export const setSourceWallet = createAction(
  NewTransactionAction.SET_SOURCE_WALLET,
  props<Wallet>()
);

export const addNewTransaction = createAction(
  NewTransactionAction.ADD_NEW_TRANSACTION,
  props<Transaction>()
);

export const addNewTransactionSuccess = createAction(
  NewTransactionAction.ADD_NEW_TRANSACTION_SUCCESS,
  props<ApiResponse<Transaction>>()
);

export const addNewTransactionFailed = createAction(
  NewTransactionAction.ADD_NEW_TRANSACTION_FAILED
);
