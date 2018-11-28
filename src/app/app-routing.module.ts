import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {NgModule} from '@angular/core';

import {HomeComponent} from './core/home/home.component';
import {NotFoundComponent} from './core/not-found/not-found.component';
import {AboutComponent} from './core/about/about.component';
import {ContactComponent} from './core/contact/contact.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
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
