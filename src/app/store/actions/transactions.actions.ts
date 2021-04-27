import { createAction, props } from '@ngrx/store';
import { Transaction } from './../../administration/transactions/transactions.models';
import { ApiResponse } from './../../shared/models/response.models';

const TRANSACTIONS = '[Transactions]';

export const TransactionAction = {
  RESET_STATE: `${TRANSACTIONS} Reset State`,
  GET_TRANSACTIONS_BY_WALLET_ID: `${TRANSACTIONS} Get Transactions by Wallet ID`,
  GET_TRANSACTIONS_BY_WALLET_ID_SUCCESS: `${TRANSACTIONS} Get Transactions by Wallet ID success`,
  GET_TRANSACTIONS_BY_WALLET_ID_FAILED: `${TRANSACTIONS} Get Transactions by Wallet ID failed`,
  ADD_TRANSACTION_TO_LIST: `${TRANSACTIONS} Add Transaction to list`
};

export const resetState = createAction(
  TransactionAction.RESET_STATE
);

export const getTransactionsByWalletId = createAction(
  TransactionAction.GET_TRANSACTIONS_BY_WALLET_ID,
  props<{ walletId: string; }>()
);

export const getTransactionsByWalletIdSuccess = createAction(
  TransactionAction.GET_TRANSACTIONS_BY_WALLET_ID_SUCCESS,
  props<ApiResponse<Transaction[]>>()
);

export const getTransactionsByWalletIdFailed = createAction(
  TransactionAction.GET_TRANSACTIONS_BY_WALLET_ID_FAILED
);

export const addTransactionToList = createAction(
  TransactionAction.ADD_TRANSACTION_TO_LIST,
  props<Transaction>()
);
