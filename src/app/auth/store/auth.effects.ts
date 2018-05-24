import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {fromPromise} from 'rxjs/observable/fromPromise';

import {Actions, Effect} from '@ngrx/effects';

import * as fromAuthActions from './auth.actions';
import {AuthService} from '../auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router, private authSvc: AuthService) {}

  // TODO: complete effect
  // @Effect() authSignup = this.actions$.ofType(fromAuthActions.TRY_SIGNUP).map((action: fromAuthActions.TrySignup) => {
  //   return action.payload;
  // }).switchMap(payload => this.authSvc.registerUser(payload.username, payload.password, payload.confirm_password)).map((user: any) => {
  //   console.log(user);
  // })

}
