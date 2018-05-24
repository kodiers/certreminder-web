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

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    PasswordRules,
    ValidateEqual
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    AuthRoutingModule
  ],
  providers: [AuthService]
})
export class AuthModule {

}
