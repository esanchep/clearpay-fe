import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../../shared/models/response.models';
import { Transaction } from './transactions.models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getTransactionsByWallet(walletId: string): Observable<Response<Transaction[]>> {
    return this.http.get<Response<Transaction[]>>(`/wallet/${walletId}/transactions`);
  }

  newTransaction(request: Transaction): Observable<Response<Transaction>> {
    return this.http.post<Response<Transaction>>(`/wallet/${request.sourceWalletId}/transactions`, request);
  }
}
