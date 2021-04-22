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
      from: 'One',
      to: 'Two',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 21),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '1',
      from: 'One',
      to: 'Another',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 20),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '1',
      from: 'One',
      to: 'Another',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 19),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '1',
      from: 'One',
      to: 'Third',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 15),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'One',
      to: 'Two',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 21),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'One',
      to: 'Another',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 20),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'One',
      to: 'Another',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 19),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'One',
      to: 'Third',
      amount: Math.random() * 100,
      date: new Date(2021, 4, 15),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'One',
      to: 'Fourth',
      amount: Math.random() * 100,
      date: new Date(2021, 3, 18),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'One',
      to: 'Fifth',
      amount: Math.random() * 100,
      date: new Date(2021, 3, 16),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'One',
      to: 'Sixth',
      amount: Math.random() * 100,
      date: new Date(2021, 3, 13),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'One',
      to: 'Seventh',
      amount: Math.random() * 100,
      date: new Date(2021, 3, 5),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'One',
      to: 'Eight',
      amount: Math.random() * 100,
      date: new Date(2021, 2, 3),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'One',
      to: 'Ninth',
      amount: Math.random() * 100,
      date: new Date(2021, 1, 5),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '2',
      from: 'One',
      to: 'Tenth',
      amount: Math.random() * 100,
      date: new Date(2020, 12, 24),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '3',
      from: 'One',
      to: 'Two',
      amount: Math.random() * 100,
      date: new Date(2021, 1, 1),
      balance: 245.35
    },
    {
      id: (this.initialId++).toString(),
      walletId: '3',
      from: 'One',
      to: 'Another',
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
      from: 'One',
      to: 'Two',
      walletId: '1'
    });
    return new Observable(subscriber => {
      const response: GetTransactionsResponse = { transactions: this.TRANSACTIONS };
      setTimeout(() => subscriber.next(response), 0);
    });
  }
}
