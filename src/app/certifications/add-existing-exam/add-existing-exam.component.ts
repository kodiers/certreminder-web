import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Store} from '@ngrx/store';

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

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private examSvc: ExamService) { }

  ngOnInit() {
    this.store.select('certifications').subscribe( data => {
      if (data && data.certification && data.vendor) {
        this.certification = data.certification;
        this.vendor = data.vendor;
        this.examSvc.getExamsForVendorId(this.vendor.id).subscribe((exams: Exam[]) => {
          this.exams = exams;
        });
      } else {
        this.router.navigate(['/certifications']);
      }
    });
  }

}
