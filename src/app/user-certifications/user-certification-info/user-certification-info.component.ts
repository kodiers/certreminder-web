import { Component, OnInit } from '@angular/core';

import {Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import {UserCertification} from '../models/user-certification.model';

@Component({
  selector: 'app-user-certification-info',
  templateUrl: './user-certification-info.component.html',
  styleUrls: ['./user-certification-info.component.scss']
})
export class UserCertificationInfoComponent implements OnInit {
  userCert: UserCertification;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('userCerts').subscribe( data => {
      console.log(data.choosedUserCertification);
    });
  }

}
