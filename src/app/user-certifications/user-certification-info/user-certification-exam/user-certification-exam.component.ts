import {Component, Input, OnInit} from '@angular/core';
import {UserExam} from '../../models/user-exam.model';

@Component({
  selector: 'app-user-certification-exam',
  templateUrl: './user-certification-exam.component.html',
  styleUrls: ['./user-certification-exam.component.scss']
})
export class UserCertificationExamComponent implements OnInit {
  @Input() userExam: UserExam;

  constructor() { }

  ngOnInit() {
  }

}
