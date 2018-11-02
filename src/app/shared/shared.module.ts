import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { QuestionIconComponent } from './views/question-icon/question-icon.component';
import {DateModalComponent} from './views/date-modal/date-modal.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule
  ],
  declarations: [
    QuestionIconComponent,
    DateModalComponent
  ],
  exports: [
    QuestionIconComponent,
    DateModalComponent,
    CommonModule
  ],
  entryComponents: [DateModalComponent]
})
export class SharedModule {

}
