import {Component, Input, OnInit} from '@angular/core';

import {Certification} from '../../../../shared/models/certification.model';
import {Exam} from '../../../../shared/models/exam.model';
import {ExamService} from '../../../services/exam.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-certification-exam-list',
  templateUrl: './certification-exam-list.component.html',
  styleUrls: ['./certification-exam-list.component.scss']
})
export class CertificationExamListComponent implements OnInit {
  @Input() certification: Certification;
  exams: Exam[] = [];
  infoMessage: string = null;
  errorMessage: string = null;

  constructor(private examSvc: ExamService) { }

  ngOnInit() {
  }

  getExams() {
    this.infoMessage = null;
    this.errorMessage = null;
    this.examSvc.getExamsForCertification(this.certification).subscribe(
      (exams: Exam[]) => {
        this.exams = exams;
        if (exams.length === 0) {
          this.infoMessage = 'This certification does not have any exams.';
        }},
      (error) => {
        this.errorMessage = 'Could not download exams for certification';
      });
  }

}
