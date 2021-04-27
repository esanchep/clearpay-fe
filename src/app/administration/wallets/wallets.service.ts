import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/response.models';
import { Wallet } from './wallets.models';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  getWalletsByUserId(userId: string): Observable<ApiResponse<Wallet[]>> {
    return this.http.get<ApiResponse<Wallet[]>>(`/user/${userId}/wallets`);
  }
}
