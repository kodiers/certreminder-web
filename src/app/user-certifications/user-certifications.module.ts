import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EffectsModule} from '@ngrx/effects';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {SharedModule} from '../shared/shared.module';
import {UserCertificationsRoutingModule} from './user-certifications.routing.module';
import { UserCertificationListComponent } from './user-certification-list/user-certification-list.component';
import { UserCertificationListItemComponent } from './user-certification-list/user-certification-list-item/user-certification-list-item.component';
import {UserCertificationService} from './services/user-certification.service';
import {UserCertificationsEffects} from './store/user-certifications.effects';
import { UserCertificationInfoComponent } from './user-certification-info/user-certification-info.component';
import { UserCertificationExamComponent } from './user-certification-info/user-certification-exam/user-certification-exam.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    UserCertificationsRoutingModule,
    EffectsModule.forFeature([UserCertificationsEffects]),
    FontAwesomeModule
  ],
  declarations: [
    UserCertificationListComponent,
    UserCertificationListItemComponent,
    UserCertificationInfoComponent,
    UserCertificationExamComponent
  ],
  providers: [
    UserCertificationService
  ]
})
export class UserCertificationsModule { }
