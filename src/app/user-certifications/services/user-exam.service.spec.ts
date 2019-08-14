import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { UserExamService } from './user-exam.service';
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

  it('should create user exams', () => {
    const data =
      {
        exam_id: userExam.exam_id,
        date_of_pass: `${userExam.date_of_pass.getFullYear()}-${userExam.date_of_pass.getMonth() + 1}-${userExam.date_of_pass.getDay()}`
      };
    const mockResponse = [userExam];
    userExamService.createUsersExams(userCertification.id, [data]).subscribe(data => {
      expect(data[0]).toEqual(userExam);
    });
    const req = httpTestingController.expectOne(API_URL + 'remainder/exam/bulk/create/');
    req.flush(mockResponse);
  });

  it('should create user exam', () => {
    const mockResponse = userExam;
    userExamService.createUserExam(userCertification.id, userExam.exam_id, userExam.date_of_pass).subscribe(data => {
      expect(data).toEqual(userExam);
    });
    const req = httpTestingController.expectOne(API_URL + 'remainder/exam/');
    req.flush(mockResponse);
  });
});
