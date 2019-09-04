import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SharedModule} from '../shared/shared.module';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {AuthService} from './auth.service';
import {AuthRoutingModule} from './auth-routing.module';
import { PasswordRules } from './validators/password-rules.directive';
import { ValidateEqual } from './validators/validate-equal.directive';
import {UserCertificationsRoutingModule} from '../user-certifications/user-certifications.routing.module';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { RestorePasswordConfirmComponent } from './restore-password-confirm/restore-password-confirm.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    PasswordRules,
    ValidateEqual,
    RestorePasswordComponent,
    RestorePasswordConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    AuthRoutingModule,
    UserCertificationsRoutingModule
  ],
  providers: [AuthService]
})
export class AuthModule {

}
