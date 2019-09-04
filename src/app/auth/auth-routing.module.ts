import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {RestorePasswordComponent} from './restore-password/restore-password.component';
import {RestorePasswordConfirmComponent} from './restore-password-confirm/restore-password-confirm.component';

const authRoutes: Routes = [
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'restore', component: RestorePasswordComponent},
  { path: 'password/reset/:token', component: RestorePasswordConfirmComponent},
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
