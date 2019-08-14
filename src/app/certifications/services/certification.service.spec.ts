import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { CertificationService } from './certification.service';
import {Vendor} from '../../shared/models/vendor.model';
import {Certification} from '../../shared/models/certification.model';
import {API_URL} from '../../shared/constants';


const vendor = new Vendor(1, new Date(), new Date(), 'test', 'test.jpg', 'test');
const certification = new Certification(1, new Date(), new Date(), 'test', '5A', 'test.jpg',
  'test', false, vendor.id);

describe('CertificationService', () => {
  let httpTestingController: HttpTestingController;
  let certificationService: CertificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CertificationService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    certificationService = TestBed.get(CertificationService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(certificationService).toBeTruthy();
  });

  it('should get certifications for vendor', () => {
    const mockResponse = {results: [certification]};
    certificationService.getCertificationsForVendor(vendor).subscribe(data => {
      expect(data.length).toEqual(1);
      expect(data[0].id).toEqual(certification.id);
      expect(data[0].updated).toEqual(certification.updated);
      expect(data[0].created).toEqual(certification.created);
      expect(data[0].title).toEqual(certification.title);
      expect(data[0].number).toEqual(certification.number);
      expect(data[0].image).toEqual(certification.image);
      expect(data[0].description).toEqual(certification.description);
      expect(data[0].deprecated).toBeFalsy();
      expect(data[0].vendor).toEqual(vendor.id);
    });
    const req = httpTestingController.expectOne(API_URL + `certifications/certification/?vendor=${vendor.id}`);
    req.flush(mockResponse);
  });

  it('should create certification', () => {
    const mockResponse = certification;
    const data = {
      "title": certification.title,
      "number": certification.number,
      "description": certification.description,
      "deprecated": certification.deprecated,
      "vendor": vendor.id
    };
    certificationService.createCertification(data).subscribe(data => {
      expect(data.id).toEqual(certification.id);
      expect(data.title).toEqual(certification.title);
      expect(data.number).toEqual(certification.number);
      expect(data.description).toEqual(certification.description);
      expect(data.deprecated).toBeFalsy();
      expect(data.vendor).toEqual(vendor.id);
    });
    const req = httpTestingController.expectOne(API_URL + 'certifications/certification/');
    req.flush(mockResponse);
  });
});
