import {Action} from '@ngrx/store';
import {UserCertification} from '../models/user-certification.model';
import {Vendor} from '../../shared/models/vendor.model';
import {UserExam} from '../models/user-exam.model';

export const GET_ALL_USER_CERTS = 'GET_ALL_USER_CERTS';
export const GET_ALL_USER_CERTS_FAILED = 'GET_ALL_USER_CERTS_FAILED';
export const SET_ALL_USER_CERTS = 'SET_ALL_USER_CERTS';
export const GET_ALL_VENDORS = 'GET_ALL_VENDORS';
export const GET_ALL_VENDORS_FAILED = 'GET_ALL_VENDORS_FAILED';
export const SET_ALL_VENDORS = 'SET_ALL_VENDORS';
export const CHOOSE_USER_CERTIFICATION = 'CHOOSE_USER_CERTIFICATION';
export const GET_CHOOSED_USER_CERT_EXAMS = 'GET_CHOOSED_USER_CERT_EXAMS';
export const GET_CHOOSED_USER_CERT_EXAMS_FAILED = 'GET_CHOOSED_USER_CERT_EXAMS_FAILED';
export const SET_CHOOSED_USER_CERT_EXAMS = 'SET_CHOOSED_USER_CERT_EXAMS';
export const TRY_DELETE_USER_CERT = 'TRY_DELETE_USER_CERT';
export const DELETE_USER_CERT = 'DELETE_USER_CERT';
export const DELETE_USER_CERT_EXAM = 'DELETE_USER_CERT_EXAM';

export class GetAllUserCerts implements Action {
  readonly type = GET_ALL_USER_CERTS;
}

export class SetAllUserCerts implements Action {
  readonly type = SET_ALL_USER_CERTS;

  constructor(public payload: UserCertification[]) {}
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

  constructor (public payload: Vendor[]) {}
}

export class ChooseUserCertification implements Action {
  readonly type = CHOOSE_USER_CERTIFICATION;

  constructor (public payload: UserCertification) {}
}

export class GetChoosedUserCertExams implements Action {
  readonly type = GET_CHOOSED_USER_CERT_EXAMS;
}

export class GetChoosedUserCertExamsFailed implements Action {
  readonly type = GET_CHOOSED_USER_CERT_EXAMS_FAILED;

  constructor(public payload: string) {}
}

export class SetChoosedUserCertExams implements Action {
  readonly type = SET_CHOOSED_USER_CERT_EXAMS;

  constructor(public payload: UserExam[]) {}
}

export class DeleteUserCert implements Action {
  readonly type = DELETE_USER_CERT;

  constructor(public payload: UserCertification) {}
}

export class TryDeleteUserCert implements Action {
  readonly type = TRY_DELETE_USER_CERT;

  constructor(public payload: UserCertification) {}
}

export class DeleteUserCertExam implements Action {
  readonly type = DELETE_USER_CERT_EXAM;

  constructor(public payload: UserExam) {}
}

export type UserCertActions = GetAllUserCerts | GetAllUserCertsFailed | SetAllUserCerts | GetAllVendors
  | GetAllVendorsFailed | SetAllVendors | ChooseUserCertification | GetChoosedUserCertExams
  | GetChoosedUserCertExamsFailed | SetChoosedUserCertExams | DeleteUserCert | TryDeleteUserCert | DeleteUserCertExam;
