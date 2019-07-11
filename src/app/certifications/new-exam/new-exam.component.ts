import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';

import * as fromApp from '../../store/app.reducers';
import {Certification} from '../../shared/models/certification.model';
import {ExamService} from '../services/exam.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {
  certification: Certification;
  errorMessage: string = null;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private toastr: ToastrService,
              private examSvc: ExamService) { }

  ngOnInit() {
    this.store.select('certifications').subscribe( data => {
      if (data && data.certification) {
        this.certification = data.certification;
      } else {
        this.router.navigate(['/certifications']);
      }
    });
  }

  createExam(form: NgForm) {
    this.errorMessage = null;
    if (form.valid) {
      const examData = {
        "title": form.value.title,
        "description": form.value.description ? form.value.description : null,
        "number": form.value.number ? form.value.number: null,
        "deprecated": form.value.deprecated ? form.value.deprecated : false,
        "certification": [this.certification.id]
      };
      this.examSvc.createNewExam(examData).subscribe(
        (exam) => {
          this.toastr.success(`Exam ${exam.title} created!`, 'Your exam was successfully created!');
          this.router.navigate(['/add-exam', this.certification.id]);
        },
        (error) => {
          this.errorMessage = 'Could not create exam';
        });
    }
  }

}
