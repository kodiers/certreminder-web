import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const userCertRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(userCertRoutes)],
  exports: [RouterModule]
})
export class UserCertificationsRoutingModule {}
