import {Component, OnInit} from '@angular/core';
import * as AuthActions from './auth/store/auth.actions';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(new AuthActions.HasValidToken());
  }

  ngOnInit() {
  }
}
