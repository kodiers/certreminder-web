
import {map, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../store/auth.reducers';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.store.select('auth').pipe(take(1),map((authState: fromAuth.State) => {
      if (authState.authenticated) {
        return authState.authenticated;
      }
      this.router.navigate(['/signin']);
      return false;
    }),);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
