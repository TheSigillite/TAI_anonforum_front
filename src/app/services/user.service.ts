import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginUser} from '../interfaces/LoginUser';
import {LoginResponse} from '../interfaces/LoginResponse';
import {Response} from '../interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/users';
  constructor(private httpClient3: HttpClient) { }

  loginUser(credentals: LoginUser){
    return this.httpClient3.post<LoginResponse>(this.url + '/login', credentals);
  }

  logoutUser(token: string){
    let tokenHeaders: HttpHeaders = new HttpHeaders();
    tokenHeaders = tokenHeaders.append('x-auth-token', token);
    return this.httpClient3.delete<Response>(this.url + '/logout', {headers: tokenHeaders});
  }

  registerUser(newUser: LoginUser){
    return this.httpClient3.post<Response>(this.url + '/register', newUser);
  }

}
