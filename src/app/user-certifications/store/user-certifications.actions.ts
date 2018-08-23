import {Action} from '@ngrx/store';
import {UserCertification} from '../models/user-certification.model';
import {Vendor} from '../../shared/models/vendor.model';

export const GET_ALL_USER_CERTS = 'GET_ALL_USER_CERTS';
export const GET_ALL_USER_CERTS_FAILED = 'GET_ALL_USER_CERTS_FAILED';
export const SET_ALL_USER_CERTS = 'SET_ALL_USER_CERTS';
export const GET_ALL_VENDORS = 'GET_ALL_VENDORS';
export const GET_ALL_VENDORS_FAILED = 'GET_ALL_VENDORS_FAILED';
export const SET_ALL_VENDORS = 'SET_ALL_VENDORS';

export class GetAllUserCerts implements Action {
  readonly type = GET_ALL_USER_CERTS;
}

export class SetAllUserCerts implements Action {
  readonly type = SET_ALL_USER_CERTS;

  constructor(public payload: [UserCertification]) {}
}

export class GetAllUserCertsFailed implements Action {
  readonly type = GET_ALL_USER_CERTS_FAILED;

  constructor(public payload: any) {}
}

export class GetAllVendors implements Action {
  readonly type = GET_ALL_VENDORS;
}

export class GetAllVendorsFailed implements Action {
  readonly type = GET_ALL_VENDORS_FAILED;

  constructor (public payload: string) {}
}

export class SetAllVendors implements Action {
  readonly type = SET_ALL_VENDORS;

  constructor (public payload: [Vendor]) {}
}

export type UserCertActions = GetAllUserCerts | GetAllUserCertsFailed | SetAllUserCerts | GetAllVendors
  | GetAllVendorsFailed | SetAllVendors;
