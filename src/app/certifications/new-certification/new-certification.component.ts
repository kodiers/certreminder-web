import { Component, OnInit } from '@angular/core';

import {Store} from '@ngrx/store';

import * as fromUserCertActions from '../../user-certifications/store/user-certifications.actions';
import * as fromApp from '../../store/app.reducers';
import {Vendor} from '../../shared/models/vendor.model';

@Component({
  selector: 'app-new-certification',
  templateUrl: './new-certification.component.html',
  styleUrls: ['./new-certification.component.scss']
})
export class NewCertificationComponent implements OnInit {
  vendors: Vendor[] = [];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new fromUserCertActions.StartAddNewCert());
    this.store.select('userCerts').subscribe(data => {
      if (data.vendors === null) {
        this.store.dispatch(new fromUserCertActions.GetAllVendors());
      }
      this.vendors = data.vendors;
    })
  }

}
