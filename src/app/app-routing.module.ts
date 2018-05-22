import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {NgModule} from '@angular/core';

import {HomeComponent} from './core/home/home.component';
import {NotFoundComponent} from './core/not-found/not-found.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', loadChildren: './auth/auth-routing.module.ts#AuthRoutingModule'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
