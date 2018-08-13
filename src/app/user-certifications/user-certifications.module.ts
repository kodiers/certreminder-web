import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {SharedModule} from '../shared/shared.module';
import {UserCertificationsRoutingModule} from './user-certifications.routing.module';
import { UserCertificationListComponent } from './user-certification-list/user-certification-list.component';
import { UserCertificationListItemComponent } from './user-certification-list/user-certification-list-item/user-certification-list-item.component';
import {UserCertificationService} from './services/user-certification.service';
import {userCertReducer} from './store/user-certifications.reducers';
import {UserCertificationsEffects} from './store/user-certifications.effects';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    UserCertificationsRoutingModule,
    StoreModule.forFeature('user-certifications', userCertReducer),
    EffectsModule.forFeature([UserCertificationsEffects])
  ],
  declarations: [
    UserCertificationListComponent,
    UserCertificationListItemComponent
  ],
  providers: [
    UserCertificationService
  ]
})
export class UserCertificationsModule { }
