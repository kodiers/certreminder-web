import {Action} from '@ngrx/store';
import {UserCertification} from '../models/user-certification.model';

export const GET_ALL_USER_CERTS = 'GET_ALL_USER_CERTS';
export const GET_ALL_USER_CERTS_FAILED = 'GET_ALL_USER_CERTS_FAILED';

export class GetAllUserCerts implements Action{
  readonly type = GET_ALL_USER_CERTS;

  constructor(public payload: [UserCertification]) {}
}

export class GetAllUserCertsFailed implements Action {
  readonly type = GET_ALL_USER_CERTS_FAILED;

  constructor(public payload: any) {}

}

export type UserCertActions = GetAllUserCerts | GetAllUserCertsFailed;
