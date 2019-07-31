import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { VendorService } from './vendor.service';
import {vendor} from '../../shared/tests/fixtures/test-data';
import {Vendor} from '../../shared/models/vendor.model';
import {API_URL} from '../../shared/constants';


describe('VendorService', () => {
  let httpTestingController: HttpTestingController;
  let vendorService: VendorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendorService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    vendorService = TestBed.get(VendorService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([VendorService], (service: VendorService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all vendors', () => {
    const mockResponse = {results: [vendor]};
    vendorService.getAllVendors().subscribe(data => {
      const receivedVendors: Vendor[] = data.vendors;
      const receivedError = data.error;
      expect(receivedVendors.length).toEqual(1);
      expect(receivedError).toBeNull();
      expect(receivedVendors[0]).toEqual(vendor);
    });
    const req = httpTestingController.expectOne(API_URL + 'certifications/vendor/');
    req.flush(mockResponse);
  });

  it('should get vendor by id', () => {
    const result = vendorService.getVendorById(vendor.id, [vendor]);
    expect(result).toEqual(vendor);
  });

  it('should not get vendor by id', () => {
    const result = vendorService.getVendorById(100, [vendor]);
    expect(result).toBeNull();
  });
});
