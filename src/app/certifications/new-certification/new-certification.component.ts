import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';

import * as fromApp from '../../store/app.reducers';
import {Vendor} from '../../shared/models/vendor.model';
import {CertificationService} from '../services/certification.service';

@Component({
  selector: 'app-new-certification',
  templateUrl: './new-certification.component.html',
  styleUrls: ['./new-certification.component.scss']
})
export class NewCertificationComponent implements OnInit {
  vendor: Vendor;
  errorMessage: string = null;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private certSvc: CertificationService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.store.select('certifications').subscribe(data => {
      if (data && data.vendor) {
        this.vendor = data.vendor;
      } else {
        this.router.navigate(['/certifications']);
      }
    });
  }

  createCertification(form: NgForm) {
    this.errorMessage = null;
    if (form.valid) {
      const cert_data = {
        "title": form.value.title,
        "number": form.value.number ? form.value.number : null,
        "description": form.value.description ? form.value.description : null,
        "deprecated": form.value.deprecated ? form.value.deprecated: false,
        "vendor": this.vendor.id
      };
      this.certSvc.createCertification(cert_data).subscribe(
        (certification) => {
          this.toastr.success(`Certification ${certification.title} created!`, 'Your certification was successfully created!');
          this.router.navigate(['/certifications']);
        }, (error1) => {
          this.errorMessage = 'Could not create certification';
        });
    }
  }

}
