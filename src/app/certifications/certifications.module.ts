import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {NewCertificationComponent} from './new-certification/new-certification.component';
import {CertificationsRoutingModule} from './certifications-routing.module';
import {CertificationService} from './services/certification.service';

@NgModule({
  declarations: [
    NewCertificationComponent
  ],
  imports: [
    CommonModule,
    CertificationsRoutingModule,
    ReactiveFormsModule
  ],
  providers: [CertificationService]
})
export class CertificationsModule {}
