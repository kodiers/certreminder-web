import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Store} from '@ngrx/store';
import {NgxSpinnerService} from 'ngx-spinner';

import * as fromApp from '../../store/app.reducers';
import {Certification} from '../../shared/models/certification.model';
import {Vendor} from '../../shared/models/vendor.model';
import {ExamService} from '../services/exam.service';
import {Exam} from '../../shared/models/exam.model';

@Component({
  selector: 'app-add-existing-exam',
  templateUrl: './add-existing-exam.component.html',
  styleUrls: ['./add-existing-exam.component.scss']
})
export class AddExistingExamComponent implements OnInit {
  certification: Certification;
  vendor: Vendor;
  exams: Exam[] = [];
  searchStr: string = null;
  initialExams: Exam[] = [];
  errorMessage: string = null;
  infoMessage: string = null;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private examSvc: ExamService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.store.select('certifications').subscribe( data => {
      if (data && data.certification && data.vendor) {
        this.certification = data.certification;
        this.vendor = data.vendor;
        this.spinner.show();
        this.examSvc.getExamsForVendorId(this.vendor.id).subscribe(
          (exams: Exam[]) => {
            this.spinner.hide();
            this.exams = exams;
            this.initialExams = exams.slice();
            },
          (error) => {
            this.errorMessage = `Could not download exams for vendor ${this.vendor.title}`;
          });
      } else {
        this.router.navigate(['/certifications']);
      }
    });
  }

  filterExams() {
    if (this.searchStr) {
      this.exams = this.exams.filter((exam) => {
        return exam.title.toLowerCase().includes(this.searchStr.toLowerCase()) || (exam.number && exam.number.toLowerCase().includes(this.searchStr.toLowerCase()));
      });
    } else {
      this.resetSearch();
    }
  }

  resetSearch() {
    this.searchStr = null;
    this.exams = this.initialExams.slice();
  }

  addExamToCertification(exam: Exam) {
    this.infoMessage = null;
    this.errorMessage = null;
    this.examSvc.addCertificationToExam(exam, this.certification).subscribe((resultExam: Exam) => {
      this.infoMessage = `Exam: ${exam.title} successfully added to certification ${this.certification.title}.`;
    }, (error) => {
      this.errorMessage = `Could not add exam ${exam.title} to certification ${this.certification.title}.`;
    });
  }

  newExam() {
    this.router.navigate(['/new-exam']);
  }

}
