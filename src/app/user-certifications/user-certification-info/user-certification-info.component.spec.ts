import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {By} from '@angular/platform-browser';

import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Store, StoreModule} from '@ngrx/store';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { UserCertificationInfoComponent } from './user-certification-info.component';
import {UserExam} from '../models/user-exam.model';
import {UserCertification} from '../models/user-certification.model';
import {Vendor} from '../../shared/models/vendor.model';
import {vendor, userCertification, userExam} from '../../shared/tests/fixtures/test-data';
import * as appReducers from '../../store/app.reducers';
import * as userCertReducers from '../store/user-certifications.reducers';
import {UserCertificationService} from '../services/user-certification.service';
import {VendorService} from '../services/vendor.service';
import {UserExamService} from '../services/user-exam.service';
import {DateModalComponent} from '../../shared/views/date-modal/date-modal.component';


@Component({selector: 'app-user-certification-exam', template: ''})
class UserCertificationExamStub {
  @Input() userExam: UserExam;
}

const userCertSvcStub = {
  getUserCertification: (id: number) => {
    return userCertification;
  },
  updateUserCertification: (userCert: UserCertification) => {
    return of(userCertification);
  },
  deleteUserCertification: (userCert: UserCertification) => {
    return of();
  }
};

const vendorSvcStub = {
  getVendorById: (id: number, vendors: Vendor[]) => {
    return vendor;
  }
};

const userExamSvcStub = {
  getUserExamsForUserCertification: (userCertId: number) => {
    return of([userExam]);
  },
  createUserExam: (userCertId: number, examId: number, date: Date) => {
    return of(userExam);
  }
};

const date = new Date();

const NgbModalStub = {
  open: () => {
    return {
      componentInstance: {
        title: null
      },
      result: new Promise((resolve, reject)=> {
        resolve(date);
      })
    };
  }
};


describe('UserCertificationInfoComponent', () => {
  let component: UserCertificationInfoComponent;
  let fixture: ComponentFixture<UserCertificationInfoComponent>;
  let store: MockStore<{userCerts: {choosedUserCertification: UserCertification, vendors: Vendor[]}}>;
  let initialState = {userCerts: {choosedUserCertification: userCertification, vendors: [vendor]}};
  let userCertSvc: UserCertificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserCertificationInfoComponent,
        UserCertificationExamStub,
        DateModalComponent
      ],
      imports: [
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: userCertReducers.userCertReducer
        }),
        RouterTestingModule,
        HttpClientTestingModule,
        NgbModule,
        FontAwesomeModule
      ],
      providers: [
        provideMockStore({initialState}),
        {provide: UserCertificationService, useValue: userCertSvcStub},
        {provide: VendorService, useValue: vendorSvcStub},
        {provide: UserExamService, useValue: userExamSvcStub},
        {provide: NgbModal, useValue: NgbModalStub}
      ]
    })
    .overrideModule(BrowserDynamicTestingModule, {set: {entryComponents: [DateModalComponent]}})
    .compileComponents();
    store = TestBed.get(Store);
    userCertSvc = TestBed.get(UserCertificationService);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(userCertSvc, 'deleteUserCertification').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCertificationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display certification title', () => {
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('h3')
      ).nativeElement.textContent
    ).toEqual(userCertification.certification.title);
  });

  it('should set user certification and vendors', () => {
    component.setUserCertAndVendor(userCertification, [vendor]);
    fixture.detectChanges();
    expect(component.userCert).toEqual(userCertification);
    expect(component.vendor).toEqual(vendor);
  });

  it('should open date modal', () => {
    component.errorMessage = 'error';
    component.openDateModal();
    fixture.detectChanges();
    expect(component.errorMessage).toBeNull();
  });

  it('should delete certification', () => {
    component.deleteUserCert();
    expect(userCertSvc.deleteUserCertification).toHaveBeenCalledWith(
      userCertification
    );
  });

  it('should open add exam modal', () => {
    component.errorMessage = 'error';
    component.addExamModal();
    fixture.detectChanges();
    expect(component.errorMessage).toBeNull();
  });
});
