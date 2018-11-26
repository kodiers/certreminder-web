import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {ProfileRoutingModule} from './profile-routing.module';

import { ProfileComponent } from './profile/profile.component';
import {ProfileService} from './services/profile.service';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [ProfileComponent],
  providers: [ProfileService]
})
export class ProfileModule {

}
