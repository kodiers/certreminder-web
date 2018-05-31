import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import * as fromApp from '../../store/app.reducers';
import * as fromAuthActions from '../store/auth.actions';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSignin(form: NgForm) {
    if (form.valid) {
      const username = form.value.username;
      const password = form.value.password;
      this.store.dispatch(new fromAuthActions.TrySignin({username: username, password: password}));
    }
  }

}
