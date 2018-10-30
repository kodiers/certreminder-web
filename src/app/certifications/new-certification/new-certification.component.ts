import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

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
  userCertForm: FormGroup;
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
    });
    this.initForm();
  }

  initForm() {
    let exams = new FormArray([]);
    this.userCertForm = new FormGroup({
      'vendor': new FormControl('', Validators.required),
      'certification_id': new FormControl('', Validators.required),
      'expiration_date': new FormControl('', Validators.required),
      'exams': exams
    });
  }

  selectVendor() {
    if (this.userCertForm.controls['vendor'].value) {
      this.certSvc.getCertificationsForVendor(this.userCertForm.controls['vendor'].value).subscribe(
        (certs: Certification[]) => {
          this.certifications = certs;
        },
        (err) => {
          // TODO: handle error
        });
    }
  }

  selectCertification() {
    if (this.userCertForm.controls['certification_id'].value) {
      const choosedCerts = this.certifications.filter((cert: Certification) => {
        return cert.id === this.userCertForm.controls['certification_id'].value;
      });
      if (choosedCerts.length === 1) {
        this.choosedCertification = choosedCerts[0];
        return;
      }
    }
    this.choosedCertification = null;
  }


  saveData() {
    console.log(this.userCertForm.value);
  }

}
