import { createAction, props } from '@ngrx/store';
import { Transaction } from './../../administration/transactions/transactions.models';
import { ApiResponse } from './../../shared/models/response.models';

export const TransactionAction = {
  GET_TRANSACTIONS_BY_WALLET_ID: '[Transaction] Get Transactions by Wallet ID',
  GET_TRANSACTIONS_BY_WALLET_ID_SUCCESS: '[Transaction] Get Transactions by Wallet ID success',
  GET_TRANSACTIONS_BY_WALLET_ID_FAILED: '[Transaction] Get Transactions by Wallet ID failed',
};

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
