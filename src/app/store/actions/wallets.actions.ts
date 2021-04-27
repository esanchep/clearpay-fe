import { createAction, props } from '@ngrx/store';
import { Wallet } from 'src/app/administration/wallets/wallets.models';
import { ApiResponse } from './../../shared/models/response.models';

export const WalletsActions = {
  GET_WALLETS_BY_USER_ID: '[Wallet] Get Wallets by User ID',
  GET_WALLETS_BY_USER_ID_SUCCESS: '[Wallet] Get Wallets by User ID success',
  GET_WALLETS_BY_USER_ID_FAILED: '[Wallet] Get Wallets by User ID failed',
  SET_SELECTED_WALLET: '[Wallet] Set selected Wallet'
};

export const getWalletsByUserId = createAction(
  WalletsActions.GET_WALLETS_BY_USER_ID,
  props<{ userId: string }>()
);

export const getWalletsByUserIdSuccess = createAction(
  WalletsActions.GET_WALLETS_BY_USER_ID_SUCCESS,
  props<ApiResponse<Wallet[]>>()
);

export const getWalletsByUserIdFailed = createAction(
  WalletsActions.GET_WALLETS_BY_USER_ID_FAILED
);

export const setSelectedWallet = createAction(
  WalletsActions.SET_SELECTED_WALLET,
  props<Wallet>()
);
