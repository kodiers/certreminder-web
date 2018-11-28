import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Store} from '@ngrx/store';

import {Certification} from '../../../../shared/models/certification.model';
import {Exam} from '../../../../shared/models/exam.model';
import {ExamService} from '../../../services/exam.service';
import * as fromApp from '../../../../store/app.reducers';
import * as CertActions from '../../../store/certifications.actions';
import {Vendor} from '../../../../shared/models/vendor.model';

@Component({
  selector: 'app-certification-exam-list',
  templateUrl: './certification-exam-list.component.html',
  styleUrls: ['./certification-exam-list.component.scss']
})
export class CertificationExamListComponent implements OnInit {
  @Input() certification: Certification;
  @Input() vendor: Vendor;
  exams: Exam[] = [];
  infoMessage: string = null;
  errorMessage: string = null;

  constructor(private examSvc: ExamService,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

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

  addExamToCertification() {
    this.store.dispatch(new CertActions.CertificationChoosed({certification: this.certification, vendor: this.vendor}));
    this.router.navigate(['add-exam', this.certification.id]);
  }

}
