import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { QuestionIconComponent } from './views/question-icon/question-icon.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    QuestionIconComponent
  ],
  exports: [
    QuestionIconComponent,
    CommonModule
  ]
})
export class SharedModule {

}
