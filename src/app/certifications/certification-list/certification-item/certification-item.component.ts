import {Component, Input, OnInit} from '@angular/core';

import {Certification} from '../../../shared/models/certification.model';
import {Vendor} from '../../../shared/models/vendor.model';
import {VendorService} from '../../../user-certifications/services/vendor.service';

@Component({
  selector: 'app-certification-item',
  templateUrl: './certification-item.component.html',
  styleUrls: ['./certification-item.component.scss']
})
export class CertificationItemComponent implements OnInit {
  @Input() certification: Certification;
  @Input() vendors: Vendor[];
  vendor: Vendor;

  constructor(private vendorSvc: VendorService) { }

  ngOnInit() {
    if (this.certification && this.vendors) {
      this.vendor = this.vendorSvc.getVendorById(this.certification.vendor, this.vendors);
    }
  }

}
