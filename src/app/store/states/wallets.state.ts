import { Wallet } from './../../administration/wallets/wallets.models';

export interface WalletsState {
  walletList: Wallet[];
  selectedWallet?: Wallet;
}
