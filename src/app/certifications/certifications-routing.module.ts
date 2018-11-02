import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {NewCertificationComponent} from './new-certification/new-certification.component';
import {AuthGuard} from '../auth/guards/auth.guard';

const certRoutes: Routes = [
  {path: 'new-certification', component: NewCertificationComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(certRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class CertificationsRoutingModule {

}
