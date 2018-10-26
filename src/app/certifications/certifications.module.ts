import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

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
    FormsModule
  ],
  providers: [CertificationService]
})
export class CertificationsModule {}
