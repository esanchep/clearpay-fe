import { createAction, props } from '@ngrx/store';
import { Wallet } from 'src/app/administration/wallets/wallets.models';
import { ApiResponse } from './../../shared/models/response.models';

const WALLETS = '[Wallets]';

export const WalletsActions = {
  RESET_STATE: `${WALLETS} Reset State`,
  GET_WALLETS_BY_USER_ID: `${WALLETS} Get Wallets by User ID`,
  GET_WALLETS_BY_USER_ID_SUCCESS: `${WALLETS} Get Wallets by User ID success`,
  GET_WALLETS_BY_USER_ID_FAILED: `${WALLETS} Get Wallets by User ID failed`,
  SET_SELECTED_WALLET: `${WALLETS} Set selected Wallet`
};

export const resetState = createAction(
  WalletsActions.RESET_STATE
);

export const getWalletsByUserId = createAction(
  WalletsActions.GET_WALLETS_BY_USER_ID,
  props<{ userId: string; }>()
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
