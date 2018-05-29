import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {API_URL} from '../shared/constants';

@Injectable()
export class AuthService {
  token: string;

  constructor(private httpClient: HttpClient) {}

  registerUser(username: string, password: string, password_confirmation: string) {
    let url = `${API_URL}people/register/`;
    return this.httpClient.post(url, {"username": username, "password": password, "confirm_password": password_confirmation}).map(response => {
      console.log(response);
      return response;
    });
  }
}
