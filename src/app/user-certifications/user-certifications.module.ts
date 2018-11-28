import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
import { UserCertificationAddExamComponent } from './user-certification-add-exam/user-certification-add-exam.component';
import {ExamService} from '../certifications/services/exam.service';
import {NewUserCertificationComponent} from './new-user-certification/new-user-certification.component';
import {CertificationService} from '../certifications/services/certification.service';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    UserCertificationsRoutingModule,
    EffectsModule.forFeature([UserCertificationsEffects]),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [
    UserCertificationListComponent,
    UserCertificationListItemComponent,
    UserCertificationInfoComponent,
    UserCertificationExamComponent,
    UserCertificationAddExamComponent,
    NewUserCertificationComponent
  ],
  providers: [
    UserCertificationService,
    ExamService,
    CertificationService,
    NgbActiveModal
  ],
  entryComponents: [
    UserCertificationAddExamComponent
  ]
})
export class UserCertificationsModule { }
