import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetTransactionsRequest, GetTransactionsResponse, NewTransactionRequest, Transaction } from './transactions.models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private initialId = Math.random();
  readonly TRANSACTIONS: Transaction[] = [
    {
      id: (this.initialId++).toString(),
      walletId: '1',
      from: 'terminator (wallet_1)',
      to: 'Two (wallet_3)',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 21),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '1',
      from: 'terminator (wallet_1)',
      to: 'Another (wallet_2)',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 20),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '1',
      from: 'terminator (wallet_1)',
      to: 'Another (wallet_2)',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 19),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '1',
      from: 'terminator (wallet_1)',
      to: 'Third (wallet_1)',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 15),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'terminator (wallet_1)',
      to: 'Two (wallet_3)',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 21),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'terminator (wallet_1)',
      to: 'Another (wallet_1)',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 20),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'terminator (wallet_1)',
      to: 'Another (wallet_1)',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 19),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'terminator (wallet_1)',
      to: 'Third (wallet_2)',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 15),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'terminator (wallet_1)',
      to: 'Fourth (wallet_2)',
      amount: Math.random() * 100,
      date: new Date(2021, 3, 18),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'terminator (wallet_1)',
      to: 'Fifth (wallet_2)',
      amount: Math.random() * 100,
      date: new Date(2021, 3, 16),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'terminator (wallet_1)',
      to: 'Sixth (wallet_2)',
      amount: Math.random() * 100,
      date: new Date(2021, 3, 13),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'terminator (wallet_1)',
      to: 'Seventh (wallet_2)',
      amount: Math.random() * 100,
      date: new Date(2021, 3, 5),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'terminator (wallet_1)',
      to: 'Eight (wallet_2)',
      amount: Math.random() * 100,
      date: new Date(2021, 2, 3),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'terminator (wallet_1)',
      to: 'Ninth (wallet_2)',
      amount: Math.random() * 100,
      date: new Date(2021, 1, 5),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'terminator (wallet_1)',
      to: 'Tenth (wallet_2)',
      amount: Math.random() * 100,
      date: new Date(2020, 12, 24),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '3',
      from: 'terminator (wallet_1)',
      to: 'Two (wallet_2)',
      amount: Math.random() * 100,
      date: new Date(2021, 1, 1),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '3',
      from: 'terminator (wallet_1)',
      to: 'Another (wallet_2)',
      amount: Math.random() * 100,
      date: new Date(2020, 12, 31),
      balance: 245.35
    }
  ];

  constructor() { }

  getTransactionsByWallet(request: GetTransactionsRequest): Observable<GetTransactionsResponse> {
    if (!request || !request.walletId) {
      return this.getResponse(this.TRANSACTIONS);
    }
    const filteredTransactions = this.TRANSACTIONS.filter(transaction => transaction.walletId === request.walletId);
    return this.getResponse(filteredTransactions);
  }

  private getResponse(transactions: Transaction[]): Observable<GetTransactionsResponse> {
    const response = { transactions };
    return new Observable(subscriber => {
      setTimeout(() => subscriber.next(response), 0);
    });
  }

  // TODO NewTransactionRequest stays as it is but GetTransactionsResponse will receive a User and Wallet objects instead of names/ids
  newTransaction(request: NewTransactionRequest): Observable<GetTransactionsResponse> {
    request = {
      fromUserId: '1',
      fromWalletId: '1',
      amount: 10,
      toUserId: '2',
      toWalletId: '2',
    } as NewTransactionRequest;
    this.TRANSACTIONS.push({
      id: (this.initialId++).toString(),
      amount: request.amount,
      date: new Date(),
      from: 'terminator (wallet_1)',
      to: 'Two',
      walletId: request.fromWalletId
    });
    return new Observable(subscriber => {
      const response: GetTransactionsResponse = {
        transactions: this.TRANSACTIONS.filter(transaction => transaction.walletId === request.fromWalletId)
      };
      setTimeout(() => subscriber.next(response), 0);
    });
  }
}
