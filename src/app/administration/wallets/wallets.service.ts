import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetWalletsResponse, Wallet } from './wallets.models';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  readonly WALLETS: Wallet[] = [
    {
      id: '1',
      walletName: 'wallet_1',
      balance: Math.random() * 1000
    },
    {
      id:'2',
      walletName: 'wallet_2',
      balance: Math.random() * 1000
    },
    {
      id: '3',
      walletName: 'wallet_3',
      balance: Math.random() * 1000
    }
  ];

  constructor() { }

  getAllWallets(): Observable<GetWalletsResponse> {
    const response: GetWalletsResponse = {
      wallets: this.WALLETS
    };
    return new Observable(subscriber => {
      setTimeout(() => subscriber.next(response), 0);
    });
  }
}
