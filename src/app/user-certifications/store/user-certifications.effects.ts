import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';

import * as userCertActions from './user-certifications.actions';
import {UserCertificationService} from '../services/user-certification.service';

@Injectable()
export class UserCertificationsEffects {
  constructor(private actions$: Actions, private userCertSvc: UserCertificationService) {}

  @Effect() getAllUsersCerts = this.actions$.ofType(userCertActions.GET_ALL_USER_CERTS).switchMap(
    (action: userCertActions.GetAllUserCerts) => {
      return this.userCertSvc.getAllUserCertifications();
    }).mergeMap(data => {
      if (data.error === null) {
        return [
          {
          type: userCertActions.SET_ALL_USER_CERTS,
          payload: data.userCerts
        }
        ];
      }
      return [
        {type: userCertActions.GET_ALL_USER_CERTS_FAILED, payload: 'Could not download certifications.'}
        ];
  });

}
