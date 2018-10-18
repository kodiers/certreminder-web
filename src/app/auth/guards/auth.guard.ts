import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';

import {Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../store/auth.reducers';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').take(1).map((authState: fromAuth.State) => {
      if (authState.authenticated) {
        return authState.authenticated;
      }
      this.router.navigate(['/signin']);
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
