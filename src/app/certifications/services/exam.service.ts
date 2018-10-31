import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_URL} from '../../shared/constants';
import {Certification} from '../../shared/models/certification.model';
import {Exam} from '../../shared/models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  protected EXAM_LIST_URL = API_URL + "certifications/exam/";

  constructor(private http: HttpClient) { }

  public getExamsForCertification(certification: Certification): Observable<Exam[]> {
    /*
    Get exams for certification
     */
    const params = new HttpParams().set('certification', `${certification.id}`);
    return this.http.get(this.EXAM_LIST_URL, {params}).map( (response: any) => {
      return response.results;
    });
  }
}
