import {Component, Input, OnInit} from '@angular/core';

import {Exam} from '../../../../../shared/models/exam.model';

@Component({
  selector: 'app-certification-exam-item',
  templateUrl: './certification-exam-item.component.html',
  styleUrls: ['./certification-exam-item.component.scss']
})
export class CertificationExamItemComponent implements OnInit {
  @Input() exam: Exam;

  constructor() { }

  ngOnInit() {
  }

}
