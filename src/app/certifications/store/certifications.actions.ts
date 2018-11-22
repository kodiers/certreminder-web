import {Action} from '@ngrx/store';
import {Certification} from '../../shared/models/certification.model';
import {Vendor} from '../../shared/models/vendor.model';

export const CERTIFICATION_CHOOSED = 'CERTIFICATION_CHOOSED';
export const VENDOR_FOR_CREATE_CHOOSED = 'VENDOR_FOR_CREATE_CHOOSED';

export class CertificationChoosed implements Action {
  readonly type = CERTIFICATION_CHOOSED;

  constructor(public payload: {certification: Certification, vendor: Vendor}) {}
}

export class VendorForCreateChoosed implements Action {
  readonly type = VENDOR_FOR_CREATE_CHOOSED;

  constructor(public payload: Vendor) {}
}

export type CertificationsActions = CertificationChoosed | VendorForCreateChoosed;
