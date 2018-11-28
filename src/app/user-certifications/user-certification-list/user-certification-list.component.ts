import { Component, OnInit } from '@angular/core';

import {Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromUserCertActions from '../store/user-certifications.actions';
import {UserCertification} from '../models/user-certification.model';
import {Vendor} from '../../shared/models/vendor.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-certification-list',
  templateUrl: './user-certification-list.component.html',
  styleUrls: ['./user-certification-list.component.scss']
})
export class UserCertificationListComponent implements OnInit {
  vendors: Vendor[];
  userCertifications: UserCertification[];
  errorMessage: string;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) {
    this.store.dispatch(new fromUserCertActions.GetAllVendors());
    this.store.dispatch(new fromUserCertActions.GetAllUserCerts());
  }

  ngOnInit() {
    this.store.select('userCerts').subscribe(data => {
      if (data) {
        this.vendors = data.vendors;
        this.userCertifications = data.userCertifications;
        this.errorMessage = data.errorMessage;
      }
    });
  }

  addCertification() {
    this.router.navigate(['/new-user-certification']);
  }

}
