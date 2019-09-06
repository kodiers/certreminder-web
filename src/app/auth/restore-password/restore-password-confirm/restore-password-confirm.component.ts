import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';

import {Store} from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import * as fromAuth from '../../store/auth.reducers';
import * as fromAuthActions from '../../store/auth.actions';


@Component({
  selector: 'app-restore-password-confirm',
  templateUrl: './restore-password-confirm.component.html',
  styleUrls: ['./restore-password-confirm.component.scss']
})
export class RestorePasswordConfirmComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription;
  passwordResetToken: string;
  authState: Observable<fromAuth.State>;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params.subscribe( data => {
      this.passwordResetToken = data.token;
    });
    this.authState = this.store.select('auth');
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  onRestorePassword(form: NgForm) {
    if (form.valid) {
      const password = form.value.password;
      const confirm_password = form.value.confirm_password;
      this.store.dispatch(new fromAuthActions.TryResetPasswordConfirm({
        token: this.passwordResetToken,
        password: password,
        confirm_password: confirm_password})
      );
    }
  }

}
