import { Component, OnInit } from '@angular/core';

import {Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromUserCertActions from '../../user-certifications/store/user-certifications.actions';
import {Vendor} from '../../shared/models/vendor.model';

@Component({
  selector: 'app-certification-list',
  templateUrl: './certification-list.component.html',
  styleUrls: ['./certification-list.component.scss']
})
export class CertificationListComponent implements OnInit {
  vendors: Vendor[] = [];

  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(new fromUserCertActions.GetAllVendors());
  }

  ngOnInit() {
    this.store.select('userCerts').subscribe(data => {
      this.vendors = data.vendors;
    });
  }

}
