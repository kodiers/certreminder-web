import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthGuard} from '../auth/guards/auth.guard';

import {UserCertificationListComponent} from './user-certification-list/user-certification-list.component';

const userCertRoutes: Routes = [
  { path: 'user-certifications', component: UserCertificationListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(userCertRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class UserCertificationsRoutingModule {}
