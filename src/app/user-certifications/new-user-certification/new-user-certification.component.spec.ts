import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { NewUserCertificationComponent } from './new-user-certification.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {RouterTestingModule} from '@angular/router/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Vendor} from '../../shared/models/vendor.model';
import {certification, exam, vendor} from '../../shared/tests/fixtures/test-data';
import {Router} from '@angular/router';
import * as appReducers from '../../store/app.reducers';
import * as userCertReducers from '../store/user-certifications.reducers';
import {Store, StoreModule} from '@ngrx/store';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {CertificationService} from '../../certifications/services/certification.service';
import {Certification} from '../../shared/models/certification.model';
import {ExamService} from '../../certifications/services/exam.service';


const certificationServiceMock = {
  getCertificationsForVendor: (vendor: Vendor) => {
    return of([certification]);
  }
};

const examServiceMock = {
  getExamsForCertification: (certification: Certification) => {
    return of([exam]);
  }
};

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

describe('NewUserCertificationComponent', () => {
  let component: NewUserCertificationComponent;
  let fixture: ComponentFixture<NewUserCertificationComponent>;
  let store: MockStore<{userCerts: {vendors: Vendor[]}}>;
  let initialState = {userCerts: {vendors: [vendor]}};
  let router: Router;
  let certSvc: CertificationService;
  let examSvc: ExamService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserCertificationComponent ],
      imports: [
        SharedModule,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: userCertReducers.userCertReducer
        }),
        HttpClientTestingModule
      ],
      providers: [
        provideMockStore({initialState}),
        {provide: Router, useValue: routerSpy},
        {provide: CertificationService, useValue: certificationServiceMock},
        {provide: ExamService, useValue: examServiceMock}
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    certSvc = TestBed.get(CertificationService);
    examSvc = TestBed.get(ExamService);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show alert', () => {
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('div.alert.alert-light')
      ).nativeElement.textContent
    ).toEqual(' You should choose Vendor, Certification and certification date. If you add exam you should choose exam and it\'s date. ');
  });

  it('should display form', () => {
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('form > div.row > div.col-sm-2.text-center > div.form-group > label')
      ).nativeElement.textContent
    ).toEqual('Choose vendor:');
  });

  it('should get certifications on vendor select', () => {
    component.vendors = [vendor];
    component.userCertForm.controls['vendor'].setValue(vendor);
    fixture.detectChanges();
    component.selectVendor();
    fixture.detectChanges();
    expect(component.certifications.length).toEqual(1);
    expect(component.certifications[0]).toEqual(certification);
  });

  it('should get exams on certification select', () => {
    component.certifications = [certification];
    component.userCertForm.controls['certification_id'].setValue(certification.id);
    fixture.detectChanges();
    component.selectCertification();
    fixture.detectChanges();
    expect(component.exams.length).toEqual(1);
    expect(component.exams[0]).toEqual(exam);
  });
});
