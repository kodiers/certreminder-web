
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_URL} from '../../shared/constants';
import {Profile} from '../../shared/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  protected USER_API_URL = API_URL + 'people/user/';

  constructor(private http: HttpClient) { }

  public getUserInfo(): Observable<Profile> {
    return this.http.get(this.USER_API_URL).pipe(map((response: any) => response));
  }
}
