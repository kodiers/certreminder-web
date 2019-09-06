import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import * as fromAuth from '../../store/auth.reducers';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';

@Component({
  selector: 'app-restore-password-confirm-success',
  templateUrl: './restore-password-confirm-success.component.html',
  styleUrls: ['./restore-password-confirm-success.component.scss']
})
export class RestorePasswordConfirmSuccessComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

}
