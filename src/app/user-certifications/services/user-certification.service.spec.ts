import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { UserCertificationService } from './user-certification.service';
import {userCertification} from '../../shared/tests/fixtures/test-data';
import {API_URL} from '../../shared/constants';
import {formatDateToStr} from '../../shared/helpers/functions';


describe('UserCertificationService', () => {
  let httpTestingController: HttpTestingController;
  let userCertificationService: UserCertificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCertificationService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    userCertificationService = TestBed.get(UserCertificationService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([UserCertificationService], (service: UserCertificationService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all user certification', () => {
    const mockResponse = {results: [userCertification]};
    userCertificationService.getAllUserCertifications().subscribe(data => {
      expect(data.error).toBeNull();
      expect(data.userCerts.length).toEqual(mockResponse.results.length);
      expect(data.userCerts[0]).toEqual(userCertification);
    });
    const req = httpTestingController.expectOne(API_URL + "remainder/certification/");
    req.flush(mockResponse);
  });

  it('should get user certification by id', () => {
    const result = userCertificationService.getUserCertificationById(userCertification.id, [userCertification]);
    expect(result).toEqual(userCertification);
  });

  it('should not get user certification by id', () => {
    const result = userCertificationService.getUserCertificationById(1000, [userCertification]);
    expect(result).toBeNull();
  });

  it('should get user certification', () => {
    const mockResponse = userCertification;
    userCertificationService.getUserCertification(userCertification.id).subscribe(data => {
      expect(data).toEqual(userCertification);
    });
    const req = httpTestingController.expectOne(API_URL + `remainder/certification/${userCertification.id}/`);
    req.flush(mockResponse);
  });

  it('should update user certification', () => {
    const mockResponse = userCertification;
    userCertificationService.updateUserCertification(userCertification).subscribe(data => {
      expect(data).toEqual(userCertification);
    });
    const req = httpTestingController.expectOne(API_URL + `remainder/certification/${userCertification.id}/`);
    req.flush(mockResponse);
  });

  it('should delete user certification', () => {
    const mockResponse = null;
    userCertificationService.deleteUserCertification(userCertification).subscribe(data => {
      expect(data).toBeNull();
    });
    const req = httpTestingController.expectOne(API_URL + `remainder/certification/${userCertification.id}/`);
    req.flush(mockResponse);
  });

  it('should cerete user certification', () => {
    const mockResponse = userCertification;
    userCertificationService.createUserCertification(userCertification.certification_id, formatDateToStr(userCertification.expiration_date))
      .subscribe(data => {
        expect(data).toEqual(userCertification);
    });
    const req = httpTestingController.expectOne(API_URL + 'remainder/certification/');
    req.flush(mockResponse);
  });
});
