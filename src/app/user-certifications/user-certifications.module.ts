import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SharedModule} from '../shared/shared.module';
import {UserCertificationsRoutingModule} from './user-certifications.routing.module';
import { UserCertificationListComponent } from './user-certification-list/user-certification-list.component';
import { UserCertificationListItemComponent } from './user-certification-list/user-certification-list-item/user-certification-list-item.component';
import {UserCertificationService} from './services/user-certification.service';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    UserCertificationsRoutingModule
  ],
  declarations: [
    UserCertificationListComponent,
    UserCertificationListItemComponent
  ],
  providers: [
    UserCertificationService
  ]
})
export class UserCertificationsModule { }
