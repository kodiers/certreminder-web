
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of as observableOf} from 'rxjs';

import {API_URL} from '../../shared/constants';
import {Vendor} from '../../shared/models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  protected VENDOR_API_URL = API_URL + 'certifications/vendor/';

  constructor(private httpClient: HttpClient) { }

  getAllVendors() {
    return this.httpClient.get(this.VENDOR_API_URL).pipe(map((response: any) => {
      const vendors: Vendor[] = response.results;
      return {vendors: vendors, error: null};
    }),catchError( err => {
      const data = {vendors: null, error: err };
      return observableOf(data);
    }),);
  }

  getVendorById(id: number, vendors: Vendor[]) {
    const filteredVendors = vendors.filter(vendor => id === vendor.id);
    if (filteredVendors.length > 0) {
      return filteredVendors[0];
    }
    return null;
  }
}
