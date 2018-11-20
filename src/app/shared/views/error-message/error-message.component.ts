import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <div class="alert alert-danger error__row" role="alert" *ngIf="error">
      {{error}}
    </div>
  `,
  styles: [`
    .error__row {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  `]
})
export class ErrorMessageComponent implements OnInit {
  @Input() error: string;

  constructor() { }

  ngOnInit() {
  }

}
