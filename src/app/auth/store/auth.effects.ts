import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {switchMap, tap, map, mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Actions, Effect, ofType} from '@ngrx/effects';

import * as fromAuthActions from './auth.actions';
import {AuthService} from '../auth.service';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router, private authSvc: AuthService) {}

  @Effect() authSignup = this.actions$.pipe(
    ofType(fromAuthActions.TRY_SIGNUP),
    map((action: fromAuthActions.TrySignup) => {
      return action.payload;
    }),
    switchMap(data => {
      return this.authSvc.registerUser(data.username, data.email, data.password, data.confirm_password);
    }),
    mergeMap(data => {
      if (data.error === null) {
        const user = data.user;
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
      }
      return [
        {type: fromAuthActions.SIGNUP_FAILURE}
      ];
    }));

  @Effect({dispatch: false}) authLogout = this.actions$.pipe(
    ofType(fromAuthActions.LOGOUT),
    tap(() => {
      this.authSvc.removeToken();
      this.router.navigate(['/']);
  }));

  @Effect() hasValidToken = this.actions$.pipe(
    ofType(fromAuthActions.HAS_VALID_TOKEN),
    switchMap(() => {
      return this.authSvc.verifyToken();
    }),
    mergeMap((data: {token:string, error: any }) => {
      if (data.error === null) {
        return [
          {type: fromAuthActions.SET_TOKEN, payload: data.token},
          {type: fromAuthActions.SIGNIN}
        ];
      }
      return [{type: fromAuthActions.NOT_VALID_TOKEN}];
    })
  );

  @Effect() authSignin = this.actions$.pipe(
    ofType(fromAuthActions.TRY_SIGNIN),
    map((action: fromAuthActions.TrySignin) => {
      return action.payload;
    }),
    switchMap((data: {username: string, password: string}) => {
      return this.authSvc.signinUser(data.username, data.password);
    }),
    mergeMap(data => {
      if (data.error == null) {
        this.authSvc.setToken(data.token);
        this.router.navigate(['/']);
        return [
          {type: fromAuthActions.SIGNIN},
          {type: fromAuthActions.SET_TOKEN, payload: data.token}
        ];
      }
      return [{type: fromAuthActions.SIGNIN_FAILURE}];
    })
  );

  @Effect({ dispatch: false }) SignInFailure: Observable<any> = this.actions$.pipe(
    ofType(fromAuthActions.SIGNIN_FAILURE)
  );

  @Effect({ dispatch: false }) SignUpFailure: Observable<any> = this.actions$.pipe(
    ofType(fromAuthActions.SIGNUP_FAILURE)
  );

}
