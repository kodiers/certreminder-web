import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_URL} from '../../shared/constants';
import {UserCertification} from '../models/user-certification.model';
import {Vendor} from '../../shared/models/vendor.model';

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

  getUserCertificationById(id: number, userCerts: UserCertification[]) {
    const filteredCerts = userCerts.filter(userCert => id === userCert.id);
    if (filteredCerts.length > 0) {
      return filteredCerts[0];
    }
    return null;
  }
}
