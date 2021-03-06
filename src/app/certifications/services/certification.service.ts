
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Vendor} from '../../shared/models/vendor.model';
import {API_URL} from '../../shared/constants';
import {Certification} from '../../shared/models/certification.model';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {
  protected CERT_LIST_URL = API_URL + "certifications/certification/";

  constructor(private http: HttpClient) { }

  public getCertificationsForVendor(vendor: Vendor): Observable<Certification[]> {
    /*
    Get certifications for vendor
     */
    const params = new HttpParams().set('vendor', `${vendor.id}`);
    return this.http.get(this.CERT_LIST_URL, {params}).pipe(map( (response: any) => {
      return response.results;
    }));
  }

  public createCertification(data): Observable<Certification> {
    /*
    Create certification
     */
    return this.http.post(this.CERT_LIST_URL, data).pipe(map((response: any) => { return response}));
  }
}
