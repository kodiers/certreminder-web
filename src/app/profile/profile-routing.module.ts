import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../auth/guards/auth.guard';
import {ProfileComponent} from './profile/profile.component';

const profileRoutes: Routes = [
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ProfileRoutingModule {

}
