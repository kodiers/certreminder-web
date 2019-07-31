import { TestBed, inject } from '@angular/core/testing';

import { UserExamService } from './user-exam.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {userCertification, userExam} from '../../shared/tests/fixtures/test-data';
import {API_URL} from '../../shared/constants';
import {UserExam} from '../models/user-exam.model';

describe('UserExamService', () => {
  let httpTestingController: HttpTestingController;
  let userExamService: UserExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserExamService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    userExamService = TestBed.get(UserExamService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([UserExamService], (service: UserExamService) => {
    expect(service).toBeTruthy();
  }));

  it('should get users exams for user certification', () => {
    const mockResponse = {results: [userExam]};
    userExamService.getUserExamsForUserCertification(userCertification.id).subscribe(data => {
      expect(data.length).toEqual(1);
      expect(data[0]).toEqual(userExam);
    });
    const req = httpTestingController.expectOne(API_URL + `remainder/exam/?user_certification=${userCertification.id}`);
    req.flush(mockResponse);
  });

  it('should delete user exam', () => {
    const mockResponse = {};
    userExamService.deleteUserExam(userExam.id).subscribe(data => {
      expect(data).toEqual({});
    });
    const req = httpTestingController.expectOne(API_URL + `remainder/exam/${userExam.id}/`);
    req.flush(mockResponse);
  });

  it('should update user exam', () => {
    const mockResponse = new UserExam(userExam.id, userExam.user, userExam.user_certification,
      userExam.user_certification_id, userExam.exam, userExam.exam_id, userExam.created, userExam.updated,
      userExam.date_of_pass, null);
    userExamService.updateUserExam(userExam).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(API_URL + `remainder/exam/${userExam.id}/`);
    req.flush(mockResponse);
  });
});
