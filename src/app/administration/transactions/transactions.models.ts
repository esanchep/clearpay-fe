export interface Transaction {
  id: string;
  walletId: string;
  from: string;
  to: string;
  amount: number;
  date: Date;
  balance?: number;
}

export interface GetTransactionsRequest {
  walletId?: string;
}

export interface GetTransactionsResponse {
  transactions: Transaction[];
}

export interface NewTransactionRequest {
  fromUserId: string;
  fromWalletId: string;
  amount: number;
  toUserId: string;
  toWalletId: string;
}
