import {Component, Input, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {UserExam} from '../../models/user-exam.model';
import {UserExamService} from '../../services/user-exam.service';
import * as fromApp from '../../../store/app.reducers';
import * as fromUserCertActions from '../../store/user-certifications.actions';
import {DateModalComponent} from '../../common/date-modal/date-modal.component';

@Component({
  selector: 'app-user-certification-exam',
  templateUrl: './user-certification-exam.component.html',
  styleUrls: ['./user-certification-exam.component.scss']
})
export class UserCertificationExamComponent implements OnInit {
  @Input() userExam: UserExam;
  errorMessage: string = null;

  constructor(private userExamSvc: UserExamService,
              private store: Store<fromApp.AppState>,
              private modalSvc: NgbModal) { }

  ngOnInit() {
  }

  deleteExam() {
    this.errorMessage = null;
    this.userExamSvc.deleteUserExam(this.userExam.id).subscribe(() => {
      this.store.dispatch(new fromUserCertActions.DeleteUserCertExam(this.userExam));
    }, (err) => {
      this.errorMessage = 'Could not delete user exam';
    });
  }

  openModal() {
    // TODO: complete edit date modal
    const modalRef = this.modalSvc.open(DateModalComponent);
    modalRef.componentInstance.title = 'exam pass date';
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {});
  }

}
