import { Component, OnInit, Input } from '@angular/core';

import {Store} from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import * as fromUserCertActions from '../../store/user-certifications.actions';
import {UserCertification} from '../../models/user-certification.model';
import {Vendor} from '../../../shared/models/vendor.model';
import {VendorService} from '../../services/vendor.service';

@Component({
  selector: 'app-user-certification-list-item',
  templateUrl: './user-certification-list-item.component.html',
  styleUrls: ['./user-certification-list-item.component.scss']
})
export class UserCertificationListItemComponent implements OnInit {
  @Input() userCert: UserCertification;
  @Input() vendors: Vendor[];
  vendor: Vendor;
  isCollapsed = true;

  constructor(private vendorSvc: VendorService,
              private store: Store<fromApp.AppState>)
  { }

  ngOnInit() {
    if (this.userCert && this.vendors) {
      this.vendor = this.vendorSvc.getVendorById(this.userCert.certification.vendor, this.vendors);
    }
  }

  onSelect() {
    this.store.dispatch(new fromUserCertActions.ChooseUserCertification(this.userCert));
  }

}
