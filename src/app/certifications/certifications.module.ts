import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule} from 'ngx-spinner';

import {NewCertificationComponent} from './new-certification/new-certification.component';
import {CertificationsRoutingModule} from './certifications-routing.module';
import {CertificationService} from './services/certification.service';
import {ExamService} from './services/exam.service';
import {UserCertificationService} from '../user-certifications/services/user-certification.service';
import {UserExamService} from '../user-certifications/services/user-exam.service';
import { CertificationListComponent } from './certification-list/certification-list.component';
import { CertificationItemComponent } from './certification-list/certification-item/certification-item.component';
import {VendorService} from '../user-certifications/services/vendor.service';
import { CertificationExamListComponent } from './certification-list/certification-item/certification-exam-list/certification-exam-list.component';
import { CertificationExamItemComponent } from './certification-list/certification-item/certification-exam-list/certification-exam-item/certification-exam-item.component';

@NgModule({
  declarations: [
    NewCertificationComponent,
    CertificationListComponent,
    CertificationItemComponent,
    CertificationExamListComponent,
    CertificationExamItemComponent
  ],
  imports: [
    CommonModule,
    CertificationsRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule
  ],
  providers: [
    CertificationService,
    ExamService,
    UserCertificationService,
    UserExamService,
    VendorService
  ]
})
export class CertificationsModule {}
