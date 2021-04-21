export interface Wallet {
  id: string;
  walletName: string;
  balance: number;
}

export interface GetWalletsResponse {
  wallets: Wallet[];
}
