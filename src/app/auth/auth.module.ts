import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {AuthService} from './auth.service';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
  ],
  providers: [AuthService]
})
export class AuthModule {

}
