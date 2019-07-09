
import {map} from 'rxjs/operators';
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
    return this.http.get(this.EXAM_LIST_URL, {params}).pipe(map( (response: any) => {
      return response.results;
    }));
  }

  public getExamsForVendorId(vendorId: number): Observable<Exam[]> {
    /*
    Get exams by vendor id
     */
    const params = new HttpParams().set('certification__vendor', `${vendorId}`);
    return this.http.get(this.EXAM_LIST_URL, {params}).pipe(map((response: any) => {
      return response.results;
    }));
  }

  public addCertificationToExam(exam: Exam, cerification: Certification): Observable<Exam> {
    /*
    Add certification to exam
     */
    const data = {'certification': [cerification.id]};
    const url = this.EXAM_LIST_URL + `add/${exam.id}/`;
    return this.http.patch(url, data).pipe(map((response: any) => response));
  }

  public createNewExam(examData): Observable<Exam> {
    /*
    Create new exam
     */
    return this.http.post(this.EXAM_LIST_URL, examData).pipe(map((response:any) => response));
  }
}
