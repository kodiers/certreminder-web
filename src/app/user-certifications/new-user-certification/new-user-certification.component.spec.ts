import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormArray, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

import {NgSelectModule} from '@ng-select/ng-select';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Store, StoreModule} from '@ngrx/store';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { NewUserCertificationComponent } from './new-user-certification.component';
import {Vendor} from '../../shared/models/vendor.model';
import {certification, exam, userCertification, userExam, vendor} from '../../shared/tests/fixtures/test-data';
import * as appReducers from '../../store/app.reducers';
import * as userCertReducers from '../store/user-certifications.reducers';
import {CertificationService} from '../../certifications/services/certification.service';
import {Certification} from '../../shared/models/certification.model';
import {ExamService} from '../../certifications/services/exam.service';
import {DateModalComponent} from '../../shared/views/date-modal/date-modal.component';
import {TitleComponent} from '../../shared/views/title/title.component';
import {UserCertificationService} from '../services/user-certification.service';
import {UserExamService} from '../services/user-exam.service';
import {formatDateToStr} from '../../shared/helpers/functions';


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

const userCertServiceMock = {
  createUserCertification: (certificationId: number, expirationDate: string) => {
    return of(userCertification);
  }
};

const userExamServiceMock = {
  createUsersExams: (userCertId: number, data: [{exam_id: number, date_of_pass: string}]) => {
    return of([userExam]);
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

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);


describe('NewUserCertificationComponent', () => {
  let component: NewUserCertificationComponent;
  let fixture: ComponentFixture<NewUserCertificationComponent>;
  let store: MockStore<{userCerts: {vendors: Vendor[]}}>;
  let initialState = {userCerts: {vendors: [vendor]}};
  let router: Router;
  let certSvc: CertificationService;
  let examSvc: ExamService;
  let modal: NgbModal;
  let userCertSvc: UserCertificationService;
  let userExamSvc: UserExamService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewUserCertificationComponent,
        DateModalComponent,
        TitleComponent
      ],
      imports: [
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: userCertReducers.userCertReducer
        }),
        HttpClientTestingModule,
        NgbModule,
        FontAwesomeModule
      ],
      providers: [
        provideMockStore({initialState}),
        {provide: Router, useValue: routerSpy},
        {provide: CertificationService, useValue: certificationServiceMock},
        {provide: ExamService, useValue: examServiceMock},
        {provide: NgbModal, useValue: NgbModalStub},
        {provide: UserCertificationService, useValue: userCertServiceMock},
        {provide: UserExamService, useValue: userExamServiceMock}
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    certSvc = TestBed.get(CertificationService);
    examSvc = TestBed.get(ExamService);
    userCertSvc = TestBed.get(UserCertificationService);
    userExamSvc = TestBed.get(UserExamService);
    modal = TestBed.get(NgbModal);
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

  it('should select date', () => {
    component.certifications = [certification];
    component.chooseCertDate();
    fixture.detectChanges();
    expect(component.modalRef).toBeTruthy();
  });

  it('should add exam form', () => {
    component.certifications = [certification];
    component.addExam();
    expect((<FormArray>component.userCertForm.get('exams')).length).toEqual(1);
  });

  it('should delete exam form', () => {
    component.certifications = [certification];
    component.addExam();
    expect((<FormArray>component.userCertForm.get('exams')).length).toEqual(1);
    component.deleteExam(0);
    expect((<FormArray>component.userCertForm.get('exams')).length).toEqual(0);
  });

  it('should select exam date', () => {
    component.certifications = [certification];
    component.addExam();
    expect((<FormArray>component.userCertForm.get('exams')).length).toEqual(1);
    component.chooseExamDate(0);
    fixture.detectChanges();
    expect(component.modalRef).toBeTruthy();
  });

  it('should get exam date', () => {
    const date = new Date();
    component.examDates = [date];
    const result = component.getExamDate(0);
    expect(result).toEqual(date);
  });

  it('should not get exam date', () => {
    const date = new Date();
    component.examDates = [date];
    const result = component.getExamDate(component.examDates.length + 1);
    expect(result).toBeNull();
  });

  it('should get controls', () => {
    component.certifications = [certification];
    component.addExam();
    const controls = component.getControls();
    expect(controls.length).toEqual(1);
  });

  it('should save data', () => {
    const date = new Date();
    component.certifications = [certification];
    component.userCertForm.controls['certification_id'].setValue(certification.id);
    component.userCertForm.controls['expiration_date'].setValue(formatDateToStr(date));
    component.addExam();
    const examControl = (<FormArray>component.userCertForm.controls['exams']).at(0);
    (<FormArray>component.userCertForm.controls['exams']).at(0)['controls'].date_of_pass.setValue(formatDateToStr(date));
    (<FormArray>component.userCertForm.controls['exams']).at(0)['controls'].exam_id.setValue(exam.id);
    component.saveData();
    const spy = router.navigate as jasmine.Spy;
    const args = spy.calls.first().args;
    expect(args[0][0]).toEqual('/user-certifications');
  });

  it('should navigate', () => {
    component.navigateToUserCertifications();
    const spy = router.navigate as jasmine.Spy;
    const args = spy.calls.first().args;
    expect(args[0][0]).toEqual('/user-certifications');
  });
});
