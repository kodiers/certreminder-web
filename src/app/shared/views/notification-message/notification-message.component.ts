import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification-message',
  template: `
    <div class="alert alert-info info__row" role="alert" *ngIf="message">
      {{message}}
    </div>
  `,
  styles: [`
    .info__row {
      margin-bottom: 10px;
      margin-top: 10px;
    }
  `]
})
export class NotificationMessageComponent implements OnInit {
  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
