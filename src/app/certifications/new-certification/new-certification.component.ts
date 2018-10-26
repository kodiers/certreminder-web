import {Component, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';

import * as fromUserCertActions from '../../user-certifications/store/user-certifications.actions';
import * as fromApp from '../../store/app.reducers';
import {Vendor} from '../../shared/models/vendor.model';
import {Certification} from '../../shared/models/certification.model';
import {CertificationService} from '../services/certification.service';

@Component({
  selector: 'app-new-certification',
  templateUrl: './new-certification.component.html',
  styleUrls: ['./new-certification.component.scss']
})
export class NewCertificationComponent implements OnInit {
  vendors: Vendor[] = [];
  certifications: Certification[] = [];
  choosedVendor: Vendor = null;
  choosedCertification: Certification = null;

  constructor(private store: Store<fromApp.AppState>,
              private certSvc: CertificationService) { }

  ngOnInit() {
    this.store.dispatch(new fromUserCertActions.StartAddNewCert());
    this.store.select('userCerts').subscribe(data => {
      if (data.vendors === null) {
        this.store.dispatch(new fromUserCertActions.GetAllVendors());
      }
      this.vendors = data.vendors;
    })
  }

  selectVendor() {
    if (this.choosedVendor) {
      this.certSvc.getCertificationsForVendor(this.choosedVendor).subscribe(
        (certs: Certification[]) => {
          this.certifications = certs;
          console.log(this.certifications);
        },
        (err) => {
          // TODO: handle error
        });
    }
  }

  saveData() {
    console.log(this.choosedVendor);
  }

}
