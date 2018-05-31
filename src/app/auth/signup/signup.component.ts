import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromAuthActions from '../store/auth.actions';
import * as fromAuth from '../store/auth.reducers';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSignup(form: NgForm) {
    if (form.valid) {
      const username = form.value.username;
      const password = form.value.password;
      const confirm_password = form.value.confirm_password;
      this.store.dispatch(new fromAuthActions.TrySignup({username: username, password: password, confirm_password: confirm_password}));
    }
  }

}
