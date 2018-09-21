import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserExamService {
  /*
  Service for work with UserExam
   */
  protected USER_EXAMS_API_URL = 'remainder/exam/';

  constructor(private httpClient: HttpClient) { }

  getUserExamsForUserCertification(userCertId: number) {
    /*
    Get UserExam by user certification id
     */
    let params = new HttpParams().set('user_certification', `${userCertId}`);
    return this.httpClient.get(this.USER_EXAMS_API_URL, {params}).map((response: any) => {
      const userExams = response.results;
      return {userExams: userExams, error: null}
    }).catch(err => {
      const data = {userExams: null, error: err };
      return Observable.of(data);
    })
  }
}
