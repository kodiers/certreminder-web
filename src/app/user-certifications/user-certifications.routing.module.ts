import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthGuard} from '../auth/guards/auth.guard';

import {UserCertificationListComponent} from './user-certification-list/user-certification-list.component';
import {UserCertificationInfoComponent} from './user-certification-info/user-certification-info.component';

const userCertRoutes: Routes = [
  { path: 'user-certifications', component: UserCertificationListComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children:
      [
        {path: ':user-cert-id', component: UserCertificationInfoComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userCertRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class UserCertificationsRoutingModule {}
