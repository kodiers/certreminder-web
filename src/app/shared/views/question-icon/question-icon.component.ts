import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-question-icon',
  template: `
    <img src="../../../../assets/icons/question-mark.svg"
         class="icon"
         [placement]='placement'
         [ngbTooltip]='tooltip'>
  `,
  styles: []
})
export class QuestionIconComponent implements OnInit {
  @Input() placement = 'top';
  @Input() tooltip = '';

  constructor() { }

  ngOnInit() {
  }

}
