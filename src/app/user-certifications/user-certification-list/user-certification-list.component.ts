import { Component, OnInit } from '@angular/core';

import {Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromUserCertActions from '../store/user-certifications.actions';
import {UserCertification} from '../models/user-certification.model';

@Component({
  selector: 'app-user-certification-list',
  templateUrl: './user-certification-list.component.html',
  styleUrls: ['./user-certification-list.component.css']
})
export class UserCertificationListComponent implements OnInit {
  userCertifications: UserCertification[];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new fromUserCertActions.GetAllUserCerts());
    this.store.select('userCerts').subscribe(data => {
      if (data) {
        this.userCertifications = data.userCertifications;
      }
    });
  }

}
