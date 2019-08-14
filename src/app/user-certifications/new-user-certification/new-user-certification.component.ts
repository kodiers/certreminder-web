import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {Store} from '@ngrx/store';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import * as fromUserCertActions from '../store/user-certifications.actions';
import * as fromApp from '../../store/app.reducers';
import {Vendor} from '../../shared/models/vendor.model';
import {Certification} from '../../shared/models/certification.model';
import {CertificationService} from '../../certifications/services/certification.service';
import {DateModalComponent} from '../../shared/views/date-modal/date-modal.component';
import {formatDateToStr} from '../../shared/helpers/functions';
import {ExamService} from '../../certifications/services/exam.service';
import {Exam} from '../../shared/models/exam.model';
import {UserCertificationService} from '../services/user-certification.service';
import {UserCertification} from '../models/user-certification.model';
import {UserExamService} from '../services/user-exam.service';

@Component({
  selector: 'app-new-user-certification',
  templateUrl: './new-user-certification.component.html',
  styleUrls: ['./new-user-certification.component.scss']
})
export class NewUserCertificationComponent implements OnInit {
  vendors: Vendor[] = [];
  certifications: Certification[] = [];
  exams: Exam[] = [];
  userCertForm: FormGroup;
  choosedCertification: Certification = null;
  certDate = null;
  examDates: Date[] = [];
  errorMessage = null;
  modalRef: NgbModalRef;

  constructor(private store: Store<fromApp.AppState>,
              private certSvc: CertificationService,
              private modalSvc: NgbModal,
              private examSvc: ExamService,
              private userCertSvc: UserCertificationService,
              private userExamSvc: UserExamService,
              private router: Router) { }

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
    this.errorMessage = null;
    if (this.userCertForm.controls['vendor'].value) {
      this.certSvc.getCertificationsForVendor(this.userCertForm.controls['vendor'].value).subscribe(
        (certs: Certification[]) => {
          this.certifications = certs;
        },
        (err) => {
          this.errorMessage = 'Could not get certifications';
        });
    }
  }

  selectCertification() {
    this.errorMessage = null;
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
          (error) => {
            this.errorMessage = 'Could not get exams';
          });
        return;
      }
    }
    this.choosedCertification = null;
    this.exams = [];
  }

  chooseCertDate() {
    this.modalRef = this.modalSvc.open(DateModalComponent);
    this.modalRef.componentInstance.title = 'certification expire date';
    this.modalRef.result.then(
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

  deleteExam(i: number) {
    (<FormArray>this.userCertForm.get('exams')).removeAt(i);
    this.examDates.splice(i, 1);
  }

  chooseExamDate(i: number) {
    this.modalRef = this.modalSvc.open(DateModalComponent);
    this.modalRef.componentInstance.title = 'exam pass date';
    this.modalRef.result.then(
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
    const certificationId = this.userCertForm.controls['certification_id'].value;
    const certDate = this.userCertForm.controls['expiration_date'].value;
    const examsData = this.userCertForm.controls['exams'].value;
    this.userCertSvc.createUserCertification(certificationId, certDate).subscribe((response: UserCertification) => {
      if (examsData.length > 0) {
        this.userExamSvc.createUsersExams(response.id, examsData).subscribe((response) => {
          this.navigateToUserCertifications();
        }, (error) => {
          this.errorMessage = 'Could not create user exams';
        })
      } else {
        this.navigateToUserCertifications();
      }
    }, (error) => {
      this.errorMessage = 'Could not create user certification';
    })
  }

  navigateToUserCertifications() {
    this.router.navigate(['/user-certifications']);
  }

}
