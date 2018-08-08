import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {UserCertificationsModule} from './user-certifications/user-certifications.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import {reducers} from './store/app.reducers';
import {AuthEffects} from './auth/store/auth.effects';
import {TokenInterceptor} from './auth/interceptors/token.interceptor';
import {JsonInterceptor} from './core/interceptors/json.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AuthModule,
    SharedModule,
    AppRoutingModule,
    UserCertificationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
