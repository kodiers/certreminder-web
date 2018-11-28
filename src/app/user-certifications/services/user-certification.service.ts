
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of as observableOf} from 'rxjs';

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
    return this.httpClient.get(this.USER_CERT_LIST_URL).pipe(map((response: any) => {
      const userCerts: [UserCertification] = response.results;
      return {userCerts: userCerts, error: null};
    }),catchError( err => {
      const data = {userCerts: null, error: err};
      return observableOf(data);
    }),);
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
    return this.httpClient.get(url).pipe(map((response: UserCertification) => response));
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

  createUserCertification(certificationId: number, expirationDate: string) {
    /*
    Create user certification. expirationDate should be in 'yyyy-mm-dd'
     */
    const data = {'certification_id': certificationId, 'expiration_date': expirationDate, 'remind_at_date': null};
    return this.httpClient.post(this.USER_CERT_LIST_URL, data);
  }
}
