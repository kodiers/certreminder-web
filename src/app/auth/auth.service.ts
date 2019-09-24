import {Observable, of, of as observableOf} from 'rxjs';

import {map, catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {API_URL} from '../shared/constants';
import {extractErrorMessage} from '../shared/helpers/functions';


@Injectable()
export class AuthService {
  // TODO: add verify and refresh token

  constructor(private httpClient: HttpClient) {}

  registerUser(username: string, email: string, password: string, password_confirmation: string) {
    let url = `${API_URL}v2/people/register/`;
    const data = {"username": username, "email": email, "password": password, "confirm_password": password_confirmation};
    return this.httpClient.post(url, data).pipe(map(response => {
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
    }),
    catchError(error => {
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

  resetPassword(email: string): Observable<{result: string, error: any}> {
    const url = `${API_URL}v2/people/password/reset/`;
    const data = {email: email};
    return this.httpClient.post(url, data).pipe(
      map((response: any) => {
        return {result: 'ok', error: null};
      }),
      catchError(error => {
        const data = {result: null, error: error};
        return of(data);
      }));
  }

  resetPasswordConfirm(token: string, password: string, password_confirmation: string) {
    const url = `${API_URL}v2/people/password/reset/confirm/`;
    const data = {token: token, password: password, confirm_password: password_confirmation};
    return this.httpClient.post(url, data).pipe(
      map((response: any) => {
        return {result: 'ok', error: null};
      }),
      catchError(error => {
        const errorMessage = extractErrorMessage(error);
        const data = {result: null, error: errorMessage};
        return of(data);
      })
    );
  }
}
