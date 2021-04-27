import { createAction, props } from '@ngrx/store';
import { Transaction } from './../../administration/transactions/transactions.models';
import { User } from './../../administration/users/users.models';
import { Wallet } from './../../administration/wallets/wallets.models';
import { ApiResponse } from './../../shared/models/response.models';

const NEW_TRANSACTION = '[New Transaction]';

export const NewTransactionAction = {
  RESET_STATE: `${NEW_TRANSACTION} Reset State`,
  RESET_DESTINATION_WALLETS: `${NEW_TRANSACTION} Reset destination Wallets`,
  SET_SOURCE_USER: `${NEW_TRANSACTION} Set source User`,
  SET_SOURCE_WALLET: `${NEW_TRANSACTION} Set source Wallet`,
  GET_ELIGIBLE_DESTINATION_WALLETS: `${NEW_TRANSACTION} Get eligible destination Wallets`,
  GET_ELIGIBLE_DESTINATION_WALLETS_SUCCESS: `${NEW_TRANSACTION} Get eligible destination Wallets success`,
  GET_ELIGIBLE_DESTINATION_WALLETS_FAILED: `${NEW_TRANSACTION} Get eligible destination Wallets failed`,
  ADD_NEW_TRANSACTION: `${NEW_TRANSACTION} Add new Transaction`,
  ADD_NEW_TRANSACTION_SUCCESS: `${NEW_TRANSACTION} Add new Transaction success`,
  ADD_NEW_TRANSACTION_FAILED: `${NEW_TRANSACTION} Add new Transaction failed`,
};

export const resetState = createAction(
  NewTransactionAction.RESET_STATE
);

export const resetDestinationWallets = createAction(
  NewTransactionAction.RESET_DESTINATION_WALLETS
);

export const setSourceUser = createAction(
  NewTransactionAction.SET_SOURCE_USER,
  props<User>()
);

export const setSourceWallet = createAction(
  NewTransactionAction.SET_SOURCE_WALLET,
  props<Wallet>()
);

export const getDestinationWalletsByUserId = createAction(
  NewTransactionAction.GET_ELIGIBLE_DESTINATION_WALLETS,
  props<{ userId: string }>()
);

export const getDestinationWalletsByUserIdSuccess = createAction(
  NewTransactionAction.GET_ELIGIBLE_DESTINATION_WALLETS_SUCCESS,
  props<ApiResponse<Wallet[]>>()
);

export const getDestinationWalletsByUserIdFailed = createAction(
  NewTransactionAction.GET_ELIGIBLE_DESTINATION_WALLETS_FAILED
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
