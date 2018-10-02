import {Component, OnDestroy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import * as fromApp from '../../store/app.reducers';
import {UserCertification} from '../models/user-certification.model';
import {ActivatedRoute} from '@angular/router';
import {UserCertificationService} from '../services/user-certification.service';
import * as fromUserCertActions from '../store/user-certifications.actions';
import {Vendor} from '../../shared/models/vendor.model';
import {VendorService} from '../services/vendor.service';
import {UserExamService} from '../services/user-exam.service';
import {UserExam} from '../models/user-exam.model';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute,
    private userCertSvc: UserCertificationService,
    private vendorSvc: VendorService,
    private userExamSvc: UserExamService,
    private modalService: NgbModal) { }

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
        });
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

  openDateModal(content) {
    this.modalService.open(content);
  }

}
