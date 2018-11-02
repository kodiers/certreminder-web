import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {NewCertificationComponent} from './new-certification/new-certification.component';
import {CertificationsRoutingModule} from './certifications-routing.module';
import {CertificationService} from './services/certification.service';
import {ExamService} from './services/exam.service';
import {UserCertificationService} from '../user-certifications/services/user-certification.service';
import {UserExamService} from '../user-certifications/services/user-exam.service';

@NgModule({
  declarations: [
    NewCertificationComponent
  ],
  imports: [
    CommonModule,
    CertificationsRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    CertificationService,
    ExamService,
    UserCertificationService,
    UserExamService
  ]
})
export class CertificationsModule {}
