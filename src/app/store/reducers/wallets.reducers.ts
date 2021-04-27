import { Action, createReducer, on } from '@ngrx/store';
import { Wallet } from './../../administration/wallets/wallets.models';
import { ApiResponse } from './../../shared/models/response.models';
import { fromWalletsActions } from './../actions';
import { WalletsState } from './../states';

export const INITIAL_WALLETS_STATE: WalletsState = undefined;

const walletsReducer = createReducer(
  INITIAL_WALLETS_STATE,
  on(
    fromWalletsActions.resetState,
    fromWalletsActions.getWalletsByUserId,
    fromWalletsActions.getWalletsByUserIdFailed,
    () => INITIAL_WALLETS_STATE
  ),
  on(
    fromWalletsActions.getWalletsByUserIdSuccess,
    (state: WalletsState, data: ApiResponse<Wallet[]>) => ({
      walletList: data.body
    })
  ),
  on(
    fromWalletsActions.setSelectedWallet,
    (state: WalletsState, data: Wallet) => ({ ...state, selectedWallet: data})
  )
);

export function reducer(state: WalletsState, action: Action): WalletsState {
  return walletsReducer(state, action);
}
