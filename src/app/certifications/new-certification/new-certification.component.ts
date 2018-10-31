import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {Store} from '@ngrx/store';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import * as fromUserCertActions from '../../user-certifications/store/user-certifications.actions';
import * as fromApp from '../../store/app.reducers';
import {Vendor} from '../../shared/models/vendor.model';
import {Certification} from '../../shared/models/certification.model';
import {CertificationService} from '../services/certification.service';
import {DateModalComponent} from '../../shared/views/date-modal/date-modal.component';
import {formatDateToStr} from '../../shared/helpers/functions';
import {ExamService} from '../services/exam.service';
import {Exam} from '../../shared/models/exam.model';

@Component({
  selector: 'app-new-certification',
  templateUrl: './new-certification.component.html',
  styleUrls: ['./new-certification.component.scss']
})
export class NewCertificationComponent implements OnInit {
  vendors: Vendor[] = [];
  certifications: Certification[] = [];
  exams: Exam[] = [];
  userCertForm: FormGroup;
  choosedCertification: Certification = null;
  certDate = null;
  examDates: Date[] = [];

  constructor(private store: Store<fromApp.AppState>,
              private certSvc: CertificationService,
              private modalSvc: NgbModal,
              private examSvc: ExamService) { }

  ngOnInit() {
    this.store.dispatch(new fromUserCertActions.StartAddNewCert());
    this.store.select('userCerts').subscribe(data => {
      if (data.vendors === null) {
        this.store.dispatch(new fromUserCertActions.GetAllVendors());
      }
      this.vendors = data.vendors;
    });
    this.initForm();
  }

  private initForm() {
    let exams = new FormArray([]);
    this.userCertForm = new FormGroup({
      'vendor': new FormControl('', Validators.required),
      'certification_id': new FormControl('', Validators.required),
      'expiration_date': new FormControl('', Validators.required),
      'exams': exams
    });
  }

  private setExamDate(date: Date, i: number) {
    const examControl = (<FormArray>this.userCertForm.controls['exams']).at(i);
    examControl['controls'].date_of_pass.setValue(formatDateToStr(date));
  }

  selectVendor() {
    if (this.userCertForm.controls['vendor'].value) {
      this.certSvc.getCertificationsForVendor(this.userCertForm.controls['vendor'].value).subscribe(
        (certs: Certification[]) => {
          this.certifications = certs;
        },
        (err) => {
          // TODO: handle error
        });
    }
  }

  selectCertification() {
    if (this.userCertForm.controls['certification_id'].value) {
      const choosedCerts = this.certifications.filter((cert: Certification) => {
        return cert.id === this.userCertForm.controls['certification_id'].value;
      });
      if (choosedCerts.length === 1) {
        this.choosedCertification = choosedCerts[0];
        this.examSvc.getExamsForCertification(this.choosedCertification).subscribe(
          (exams) => {
            this.exams = exams;
          },
          (error) => {});
        return;
      }
    }
    this.choosedCertification = null;
    this.exams = [];
  }

  chooseCertDate() {
    const modalRef = this.modalSvc.open(DateModalComponent);
    modalRef.componentInstance.title = 'certification expire date';
    modalRef.result.then(
      (result) => {
        this.certDate = result;
        this.userCertForm.patchValue({
          'expiration_date': formatDateToStr(result)
        });
      },
      (reason) => {});
  }

  addExam() {
    (<FormArray>this.userCertForm.get('exams')).push(new FormGroup({
        'exam_id': new FormControl(null, Validators.required),
        'date_of_pass': new FormControl(null, Validators.required)
      }
    ));
  }

  deleteExam(i: number) {}

  chooseExamDate(i: number) {
    const modalRef = this.modalSvc.open(DateModalComponent);
    modalRef.componentInstance.title = 'exam pass date';
    modalRef.result.then(
      (result) => {
        this.examDates.push(result);
        this.setExamDate(result, i);
      },
      (reason) => {});
  }

  getExamDate(i: number): Date {
    if (this.examDates.length <= i) {
      return null;
    }
    return this.examDates[i];
  }

  getControls() {
    return (<FormArray>this.userCertForm.get('exams')).controls;
  }

  saveData() {
    console.log(this.userCertForm.value);
  }

}
