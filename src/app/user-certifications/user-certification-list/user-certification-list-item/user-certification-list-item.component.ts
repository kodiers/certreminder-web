import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private vendorSvc: VendorService) { }

  ngOnInit() {
    if (this.userCert && this.vendors) {
      this.vendor = this.vendorSvc.getVendorById(this.userCert.certification.vendor, this.vendors);
    }
  }

}
