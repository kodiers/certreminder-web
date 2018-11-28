import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
    <div class="row">
      <div class="col-sm-12 text-center">
        <h1>{{title}}</h1>
      </div>
    </div>
  `,
  styles: []
})
export class TitleComponent implements OnInit {
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
