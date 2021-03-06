import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { QuestionIconComponent } from './views/question-icon/question-icon.component';
import {DateModalComponent} from './views/date-modal/date-modal.component';
import { ErrorMessageComponent } from './views/error-message/error-message.component';
import { NotificationMessageComponent } from './views/notification-message/notification-message.component';
import { TitleComponent } from './views/title/title.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule
  ],
  declarations: [
    QuestionIconComponent,
    DateModalComponent,
    ErrorMessageComponent,
    NotificationMessageComponent,
    TitleComponent
  ],
  exports: [
    QuestionIconComponent,
    DateModalComponent,
    ErrorMessageComponent,
    NotificationMessageComponent,
    TitleComponent,
    CommonModule
  ],
  entryComponents: [DateModalComponent]
})
export class SharedModule {

}
