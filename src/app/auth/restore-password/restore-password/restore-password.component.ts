import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';

import {Store} from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import * as fromAuthActions from '../../store/auth.actions';
import * as fromAuth from '../../store/auth.reducers';


@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onResetPassword(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(new fromAuthActions.TryResetPassword({email: form.value.email}));
    }
  }

}
