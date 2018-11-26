import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {NgModule} from '@angular/core';

import {HomeComponent} from './core/home/home.component';
import {NotFoundComponent} from './core/not-found/not-found.component';
import {AboutComponent} from './core/about/about.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent},
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
