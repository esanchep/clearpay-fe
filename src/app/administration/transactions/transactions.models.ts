export interface Transaction {
  id?: string;
  sourceWalletId: string;
  destinationWalletId: string;
  amount: number;
  date?: Date;
  comment?: string;
}
