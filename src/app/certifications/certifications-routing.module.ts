import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthGuard} from '../auth/guards/auth.guard';

import {CertificationListComponent} from './certification-list/certification-list.component';
import {AddExistingExamComponent} from './add-existing-exam/add-existing-exam.component';

const certRoutes: Routes = [
  {path: 'certifications', component: CertificationListComponent, canActivate: [AuthGuard]},
  {path: 'add-exam/:id', component: AddExistingExamComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(certRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class CertificationsRoutingModule {

}
