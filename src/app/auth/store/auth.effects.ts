import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

import {Actions, Effect} from '@ngrx/effects';

import * as fromAuthActions from './auth.actions';
import {AuthService} from '../auth.service';
import {Profile} from '../../shared/models/profile.model';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router, private authSvc: AuthService) {}

  @Effect() authSignup = this.actions$.ofType(fromAuthActions.TRY_SIGNUP).map((action: fromAuthActions.TrySignup) => {
    return action.payload;
  }).switchMap(data => {
    return this.authSvc.registerUser(data.username, data.password, data.confirm_password);
  }).mergeMap((user: Profile) => {
    this.authSvc.setToken(user.token);
    this.router.navigate(['/']);
    return [
      {
        type: fromAuthActions.SIGNUP
      },
      {
        type: fromAuthActions.SET_TOKEN,
        payload: user.token
      },
      {
        type: fromAuthActions.GET_PROFILE,
        payload: user
      },
      {
        type: fromAuthActions.SIGNIN
      }
    ];
  });

  @Effect({dispatch: false}) authLogout = this.actions$.ofType(fromAuthActions.LOGOUT).do(() => {
    this.authSvc.removeToken();
    this.router.navigate(['/']);
  });

  @Effect() hasValidToken = this.actions$.ofType(fromAuthActions.HAS_VALID_TOKEN).map(() => {
    return this.authSvc.getToken();
  }).mergeMap((token: string) => {
    if (token) {
      return [
        {
          type: fromAuthActions.SET_TOKEN,
          payload: token
        },
        {
          type: fromAuthActions.SIGNIN
        }
      ];
    }
    return [{
      type: fromAuthActions.LOGOUT
    }];
  })

}
