import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthGuard} from '../auth/guards/auth.guard';

import {CertificationListComponent} from './certification-list/certification-list.component';
import {AddExistingExamComponent} from './add-existing-exam/add-existing-exam.component';
import {NewCertificationComponent} from './new-certification/new-certification.component';
import {NewExamComponent} from './new-exam/new-exam.component';

const certRoutes: Routes = [
  {path: 'certifications', component: CertificationListComponent, canActivate: [AuthGuard]},
  {path: 'add-exam/:id', component: AddExistingExamComponent, canActivate: [AuthGuard]},
  {path: 'new-certification', component: NewCertificationComponent, canActivate: [AuthGuard]},
  {path: 'new-exam', component: NewExamComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(certRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class CertificationsRoutingModule {

}
