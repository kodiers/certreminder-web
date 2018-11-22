import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import {Vendor} from '../../shared/models/vendor.model';
import {Certification} from '../../shared/models/certification.model';

@Component({
  selector: 'app-new-certification',
  templateUrl: './new-certification.component.html',
  styleUrls: ['./new-certification.component.scss']
})
export class NewCertificationComponent implements OnInit {
  vendor: Vendor;
  formData: any = {};
  errorMessage: string = null;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) { }

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
    console.log(form);
  }

}
