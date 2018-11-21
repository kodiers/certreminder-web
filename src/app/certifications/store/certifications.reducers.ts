import {Certification} from '../../shared/models/certification.model';
import * as CertActions from './certifications.actions';
import {Vendor} from '../../shared/models/vendor.model';

export interface CertState {
  certification: Certification,
  vendor: Vendor
}

export function certReducer(state: CertState, action: CertActions.CertificationsActions) {
  switch (action.type) {
    case (CertActions.CERTIFICATION_CHOOSED):
      return {
        ...state,
        certification: action.payload.certification,
        vendor: action.payload.vendor
      };
    case (CertActions.VENDOR_FOR_CREATE_CHOOSED):
      return {
        ...state,
        vendor: action.payload
      };
    default:
      return state;
  }
}
