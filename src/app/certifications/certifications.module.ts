import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgSelectModule} from '@ng-select/ng-select';

import {NewCertificationComponent} from './new-certification/new-certification.component';
import {CertificationsRoutingModule} from './certifications-routing.module';
import {CertificationService} from './services/certification.service';
import {ExamService} from './services/exam.service';
import {UserCertificationService} from '../user-certifications/services/user-certification.service';
import {UserExamService} from '../user-certifications/services/user-exam.service';
import { CertificationListComponent } from './certification-list/certification-list.component';

@NgModule({
  declarations: [
    NewCertificationComponent,
    CertificationListComponent
  ],
  imports: [
    CommonModule,
    CertificationsRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [
    CertificationService,
    ExamService,
    UserCertificationService,
    UserExamService
  ]
})
export class CertificationsModule {}
