import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Store} from '@ngrx/store';
import {NgxSpinnerService} from 'ngx-spinner';

import {Vendor} from '../../shared/models/vendor.model';
import {Certification} from '../../shared/models/certification.model';
import {CertificationService} from '../services/certification.service';
import * as fromCertActions from '../store/certifications.actions';
import * as fromApp from '../../store/app.reducers';
import * as fromUserCertActions from '../../user-certifications/store/user-certifications.actions';

@Component({
  selector: 'app-certification-list',
  templateUrl: './certification-list.component.html',
  styleUrls: ['./certification-list.component.scss']
})
export class CertificationListComponent implements OnInit {
  vendors: Vendor[] = [];
  certifications: Certification[] = [];
  errorMessage: string = null;
  selectedVendor: Vendor = null;
  searchStr: string = null;
  initialCertifications: Certification[] = [];

  constructor(private store: Store<fromApp.AppState>,
              private certSvc: CertificationService,
              private spinner: NgxSpinnerService,
              private router: Router) {
    this.store.dispatch(new fromUserCertActions.GetAllVendors());
  }

  ngOnInit() {
    this.store.select('userCerts').subscribe(data => {
      this.vendors = data.vendors;
    });
  }

  private setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  selectVendor(vendor: Vendor) {
    this.resetSearch();
    this.selectedVendor = vendor;
    this.setErrorMessage(null);
    this.spinner.show();
    this.certSvc.getCertificationsForVendor(vendor).subscribe(
      (certifications: Certification[]) => {
        this.certifications = certifications;
        this.initialCertifications = certifications.slice();
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        this.selectedVendor = null;
        this.setErrorMessage(`Could not download certifications for vendor: ${vendor.title}.`);
      });
  }

  filterCertifications(event) {
    if (this.searchStr) {
      this.certifications = this.certifications.filter((certification) => {
        return certification.title.toLowerCase().includes(this.searchStr.toLowerCase());
      });
    } else {
      this.resetSearch();
    }
  }

  resetSearch() {
    this.searchStr = null;
    this.certifications = this.initialCertifications.slice();
  }

  createCertification() {
    this.store.dispatch(new fromCertActions.VendorForCreateChoosed(this.selectedVendor));
    this.router.navigate(['/new-certification']);
  }

}
