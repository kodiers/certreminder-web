
import {of as observableOf} from 'rxjs';

import {map, catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {API_URL} from '../shared/constants';

@Injectable()
export class AuthService {
  // TODO: add verify and refresh token

  constructor(private httpClient: HttpClient) {}

  registerUser(username: string, password: string, password_confirmation: string) {
    let url = `${API_URL}people/register/`;
    return this.httpClient.post(url, {"username": username, "password": password, "confirm_password": password_confirmation}).pipe(map(response => {
      return {user: response, error: null};
    }),catchError(error => {
      const data = {user: null, error: error};
      return observableOf(data);
    }),);
  }

  getToken(): string {
    return localStorage.getItem('cert_token');
  }

  removeToken() {
    localStorage.removeItem('cert_token');
  }

  setToken(token: string) {
    localStorage.setItem('cert_token', token);
  }

  signinUser(username: string, password: string) {
    let url = `${API_URL}people/api-token-auth/`;
    return this.httpClient.post(url, {"username": username, "password": password}).pipe(map((response: any) => {
      return {token: response.token, error: null};
    }),catchError(error => {
      const data = {token: null, error: error};
      return observableOf(data);
    }),);
  }

  verifyToken() {
    let url = `${API_URL}people/api-token-verify/`;
    let token = this.getToken();
    if (token) {
      return this.httpClient.post(url, {"token": token}).pipe(map((response: any) => {
        return {token: response.token, error: null}
      }),catchError(error => {
        const data = {token: null, error: error};
        return observableOf(data);
      }),);
    }
    const error = 'No token';
    const data = {token: null, error: error};
    return observableOf(data);
  }
}
