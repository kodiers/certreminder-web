import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import * as fromApp from '../../store/app.reducers';
import {UserCertification} from '../models/user-certification.model';
import {UserCertificationService} from '../services/user-certification.service';
import * as fromUserCertActions from '../store/user-certifications.actions';
import {Vendor} from '../../shared/models/vendor.model';
import {VendorService} from '../services/vendor.service';
import {UserExamService} from '../services/user-exam.service';
import {UserExam} from '../models/user-exam.model';
import {DateModalComponent} from '../common/date-modal/date-modal.component';

@Component({
  selector: 'app-user-certification-info',
  templateUrl: './user-certification-info.component.html',
  styleUrls: ['./user-certification-info.component.scss']
})
export class UserCertificationInfoComponent implements OnInit, OnDestroy {
  userCert: UserCertification;
  vendor: Vendor;
  routeSubscription: Subscription;
  userExams: UserExam[] = [];
  storeSubscription: Subscription;
  errorMessage = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute,
    private userCertSvc: UserCertificationService,
    private vendorSvc: VendorService,
    private userExamSvc: UserExamService,
    private modalSvc: NgbModal) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('userCerts').subscribe(data => {
      if (data.choosedUserCertification) {
        this.setUserCertAndVendor(data.choosedUserCertification, data.vendors);
        // Cancel route subscription for prevent double request from server if it was previously requested
        if (this.routeSubscription) {
          this.routeSubscription.unsubscribe();
        }
        this.userExams = data.choosedUserCertExams;
      } else {
        // If state doesn't have choosedSubscription - get it from server using route param
        // TODO: this code emit store.select twice - need to fix
        this.routeSubscription = this.activatedRoute.params.map(data => data['user-cert-id']).switchMap(certId => {
          return this.userCertSvc.getUserCertification(certId);
        }).subscribe(userCert => {
          this.setUserCertAndVendor(userCert, data.vendors);
          this.store.dispatch(new fromUserCertActions.ChooseUserCertification(this.userCert));
          this.userExamSvc.getUserExamsForUserCertification(this.userCert.id).take(1).subscribe((userExams: UserExam[]) => {
            this.userExams = userExams;
            this.store.dispatch(new fromUserCertActions.SetChoosedUserCertExams(this.userExams));
          });
        }, (err) => {});
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  setUserCertAndVendor(cert: UserCertification, vendors: Vendor[]) {
    this.userCert = cert;
    if (vendors) {
      this.vendor = this.vendorSvc.getVendorById(this.userCert.certification.vendor, vendors);
    }
  }

  openDateModal() {
    this.errorMessage = null;
    const modalRef = this.modalSvc.open(DateModalComponent);
    modalRef.componentInstance.title = 'certification expire date';
    modalRef.result.then((result) => {
      this.userCert.expiration_date = result;
      this.userCertSvc.updateUserCertification(this.userCert).subscribe((response: UserCertification) => {
        this.store.dispatch(new fromUserCertActions.ChooseUserCertification(response));
        },
        (err)=> {
        this.errorMessage = 'Could not update user certification';
      });
    }, (reason) => {});
  }

  deleteUserCert() {
    this.userCertSvc.deleteUserCertification(this.userCert).subscribe(()=>{
      this.store.dispatch(new fromUserCertActions.TryDeleteUserCert(this.userCert));
    }, (err) => {
      this.errorMessage = 'Could not delete user certification';
    });
  }

}
