import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../../shared/models/response.models';
import { User } from './users.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Response<User[]>> {
    return this.http.get<Response<User[]>>(`/user`)
  }
}
