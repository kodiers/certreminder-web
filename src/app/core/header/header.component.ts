import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsible: boolean = true;
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new AuthActions.HasValidToken());
    this.authState = this.store.select('auth');
  }

  toggleMenu() {
    this.collapsible = !this.collapsible;
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
