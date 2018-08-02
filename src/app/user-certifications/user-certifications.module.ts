import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SharedModule} from '../shared/shared.module';
import {UserCertificationsRoutingModule} from './user-certifications.routing.module';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    UserCertificationsRoutingModule
  ],
  declarations: []
})
export class UserCertificationsModule { }
