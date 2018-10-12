import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_URL} from '../../shared/constants';
import {UserCertification} from '../models/user-certification.model';
import {formatDateToStr} from '../../shared/helpers/functions';

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

  getUserCertification(id: number) {
    let url = this.USER_CERT_LIST_URL + `${id}/`;
    return this.httpClient.get(url).map((response: UserCertification) => response).catch(err => {
      return Observable.of(err);
    });
  }

  updateUserCertification(userCert: UserCertification) {
    let url = this.USER_CERT_LIST_URL + `${userCert.id}/`;
    let expDate = formatDateToStr(userCert.expiration_date);
    let data = {'certification_id': userCert.certification.id, 'expiration_date': expDate, 'remind_at_date': null};
    return this.httpClient.patch(url, data);
  }

  deleteUserCertification(userCert: UserCertification) {
    let url = this.USER_CERT_LIST_URL + `${userCert.id}/`;
    return this.httpClient.delete(url);
  }
}
