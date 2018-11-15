import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthGuard} from '../auth/guards/auth.guard';

import {NewCertificationComponent} from './new-certification/new-certification.component';
import {CertificationListComponent} from './certification-list/certification-list.component';

const certRoutes: Routes = [
  {path: 'new-certification', component: NewCertificationComponent, canActivate: [AuthGuard]},
  {path: 'certifications', component: CertificationListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(certRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class CertificationsRoutingModule {

}
