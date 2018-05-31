import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {API_URL} from '../shared/constants';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  registerUser(username: string, password: string, password_confirmation: string) {
    let url = `${API_URL}people/register/`;
    return this.httpClient.post(url, {"username": username, "password": password, "confirm_password": password_confirmation}).map(response => {
      return response;
    });
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
    return this.httpClient.post(url, {"username": username, "password": password}).map((response: any) => {
      return response.token;
    })
  }
}
