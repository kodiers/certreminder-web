import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {Router} from '@angular/router';

import * as userCertActions from './user-certifications.actions';
import {UserCertificationService} from '../services/user-certification.service';
import {VendorService} from '../services/vendor.service';

@Injectable()
export class UserCertificationsEffects {
  constructor(private actions$: Actions,
              private userCertSvc: UserCertificationService,
              private vendorSvc: VendorService,
              private router: Router) {}

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

  @Effect() getAllVendors = this.actions$.ofType(userCertActions.GET_ALL_VENDORS).switchMap(
    (action: userCertActions.GetAllVendors) => {
      return this.vendorSvc.getAllVendors();
    }).mergeMap(data => {
      if (data.error === null) {
        return [
          {
            type: userCertActions.SET_ALL_VENDORS,
            payload: data.vendors
          }
          ];
      }
      return [
        {
          type: userCertActions.GET_ALL_VENDORS_FAILED,
          payload: 'Could not download vendors.'}
        ];
    });

  @Effect() tryDeleteUserCert = this.actions$.ofType(userCertActions.TRY_DELETE_USER_CERT).map((action: userCertActions.TryDeleteUserCert) => {
    return action.payload;
  }).mergeMap((data) => {
    this.router.navigate(['/user-certifications']);
    return [
      {
        type: userCertActions.DELETE_USER_CERT,
        payload: data
      }
    ];
  });

}
