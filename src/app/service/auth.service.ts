import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../constants/api';
import { Observable } from 'rxjs';

declare interface AuthResponse {
  code: number;
  msg: string;
  userId: string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signin(login: {username: string, password: string}) :Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(API.URL + API.AUTH.SIGNIN, login);
  }
}
