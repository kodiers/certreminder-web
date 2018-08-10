import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_URL} from '../../shared/constants';
import {UserCertification} from '../models/user-certification.model';

@Injectable({
  providedIn: 'root'
})
export class UserCertificationService {

  protected USER_CERT_LIST_URL = API_URL + "remainder/certification/";

  constructor(private httpClient: HttpClient) { }

  getAllUserCertifications() {
    return this.httpClient.get(this.USER_CERT_LIST_URL).map((response: any) => {
      const userCerts: [UserCertification] = response.results;
      return {userCerts: userCerts, error: null};
    }).catch( err => {
      const data = {userCerts: null, error: err};
      return Observable.of(data);
    });
  }
}
