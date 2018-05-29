import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import {fromPromise} from 'rxjs/observable/fromPromise';

import {Actions, Effect} from '@ngrx/effects';

import * as fromAuthActions from './auth.actions';
import {AuthService} from '../auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router, private authSvc: AuthService) {}

  @Effect() authSignup = this.actions$.ofType(fromAuthActions.TRY_SIGNUP).map((action: fromAuthActions.TrySignup) => {
    console.log(action.payload);
    return action.payload;
  }).switchMap(data => {
    console.log(data);
    return this.authSvc.registerUser(data.username, data.password, data.confirm_password);
  }).map((user: any) => {
    console.log(user);
    // return [
    //   {
    //     type: fromAuthActions.SIGNUP
    //   },
      // {
      //   type: fromAuthActions.SET_TOKEN,
      //   payload: token
      // }
      // ];
  })

}
