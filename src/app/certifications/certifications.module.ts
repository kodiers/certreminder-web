import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NewCertificationComponent} from './new-certification/new-certification.component';
import {CertificationsRoutingModule} from './certifications-routing.module';

@NgModule({
  declarations: [
    NewCertificationComponent
  ],
  imports: [
    CommonModule,
    CertificationsRoutingModule
  ]
})
export class CertificationsModule {}
