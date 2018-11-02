import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {API_URL} from '../../shared/constants';
import {UserExam} from '../models/user-exam.model';
import {formatDate} from '../../shared/helpers/functions';

@Injectable({
  providedIn: 'root'
})
export class UserExamService {
  /*
  Service for work with UserExam
   */
  protected USER_EXAMS_API_URL = API_URL + 'remainder/exam/';

  constructor(private httpClient: HttpClient) { }

  getUserExamsForUserCertification(userCertId: number) {
    /*
    Get UserExam by user certification id
     */
    let params = new HttpParams().set('user_certification', `${userCertId}`);
    return this.httpClient.get(this.USER_EXAMS_API_URL, {params}).map((response: any) => {
      return response.results;
    });
  }

  deleteUserExam(userExamId: number) {
    /*
    Delete user exam by Id
     */
    const url = this.USER_EXAMS_API_URL + `${userExamId}/`;
    return this.httpClient.delete(url);
  }

  updateUserExam(userExam: UserExam) {
    /*
    Update user exam
     */
    const url = this.USER_EXAMS_API_URL + `${userExam.id}/`;
    const data = {"user_certification_id": userExam.user_certification.id, "id": userExam.id, "exam_id": userExam.exam.id,
      "date_of_pass": formatDate(userExam.date_of_pass), "remind_at_date": null};
    return this.httpClient.patch(url, data).map((response: UserExam) => response);
  }

  createUsersExams(userCertId: number, data: [{exam_id: number, date_of_pass: string}]) {
    /*
    Create user exam. date_of_pass should be formatted like 'yyyy-mm-dd'
     */
    let examsData: any[] = [];
    for (let examData of data) {
      let eData = {user_certification_id: userCertId, 'exam_id': examData.exam_id, 'date_of_pass': examData.date_of_pass,
        'remind_at_date': null};
      examsData.push(eData);
    }
    const url = this.USER_EXAMS_API_URL + 'bulk/create/';
    return this.httpClient.post(url, {'exams': examsData});
  }
}
