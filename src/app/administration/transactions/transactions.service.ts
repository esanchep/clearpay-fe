import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './../../shared/models/response.models';
import { Transaction } from './transactions.models';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactionsByWallet(walletId: string): Observable<ApiResponse<Transaction[]>> {
    return this.http.get<ApiResponse<Transaction[]>>(`/wallet/${walletId}/transactions`);
  }

  addNewTransaction(request: Transaction): Observable<ApiResponse<Transaction>> {
    return this.http.post<ApiResponse<Transaction>>(`/wallet/${request.sourceWalletId}/transactions`, request);
  }
}
