import { Action, createReducer, on } from '@ngrx/store';
import { Transaction } from 'src/app/administration/transactions/transactions.models';
import { ApiResponse } from '../../shared/models/response.models';
import { fromTransactionsActions } from '../actions';
import { TransactionsState } from '../states';

export const INITIAL_TRANSACTIONS_STATE: TransactionsState = undefined;

const transactionsReducer = createReducer(
  INITIAL_TRANSACTIONS_STATE,
  on(
    fromTransactionsActions.resetState,
    fromTransactionsActions.getTransactionsByWalletId,
    fromTransactionsActions.getTransactionsByWalletIdFailed,
    () => INITIAL_TRANSACTIONS_STATE
  ),
  on(
    fromTransactionsActions.getTransactionsByWalletIdSuccess,
    (state: TransactionsState, data: ApiResponse<Transaction[]>) => ({
      transactionList: data.body
    })
  ),
  on(
    fromTransactionsActions.addTransactionToList,
    (state: TransactionsState, data: Transaction) => {
      const updatedList = [...state.transactionList];
      updatedList.unshift(data);
      return {
        ...state,
        transactionList: updatedList
      };
    }
  )
);

export function reducer(state: TransactionsState, action: Action): TransactionsState {
  return transactionsReducer(state, action);
}
