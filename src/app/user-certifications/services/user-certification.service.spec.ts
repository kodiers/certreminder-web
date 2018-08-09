import { TestBed, inject } from '@angular/core/testing';

import { UserCertificationService } from './user-certification.service';

describe('UserCertificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCertificationService]
    });
  });

  it('should be created', inject([UserCertificationService], (service: UserCertificationService) => {
    expect(service).toBeTruthy();
  }));
});
