import { createSelector } from '@ngrx/store';
import { RootState, WalletsState } from '../states';
import { Wallet } from './../../administration/wallets/wallets.models';

export const walletsSelectors = (state: RootState) => state?.wallets;

export const selectAllWallets = createSelector(
  walletsSelectors,
  (state: WalletsState) => state?.walletList
);

export const selectAllWalletsButSelectedWallet = createSelector(
  walletsSelectors,
  (state: WalletsState) => state?.walletList.filter((wallet: Wallet) => wallet.id !== state.selectedWallet?.id)
);

export const selectSelectedWalled = createSelector(
  walletsSelectors,
  (state: WalletsState) => state?.selectedWallet
);
