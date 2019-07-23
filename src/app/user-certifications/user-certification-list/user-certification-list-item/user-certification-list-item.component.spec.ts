import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Store, StoreModule} from '@ngrx/store';

import { UserCertificationListItemComponent } from './user-certification-list-item.component';
import {Vendor} from '../../../shared/models/vendor.model';
import {UserCertification} from '../../models/user-certification.model';
import * as appReducers from '../../../store/app.reducers';
import * as userCertReducers from '../../store/user-certifications.reducers';
import * as userCertActions from '../../store/user-certifications.actions';
import {Certification} from '../../../shared/models/certification.model';
import {User} from '../../../shared/models/user.model';
import {UserExamService} from '../../services/user-exam.service';
import {UserExam} from '../../models/user-exam.model';
import {Exam} from '../../../shared/models/exam.model';

const vendor = new Vendor(1, new Date(), new Date(), 'test', 'test.jpg', 'test');
const certification = new Certification(1, new Date(), new Date(), 'test', 'test', 'test.jpg',
  'test', false, vendor.id);
const exam = new Exam(1, new Date(), new Date(), 'test', 'test-1', 'test', false,
  [certification.id]);
const user = new User(1, 'test', 'test@test.com', 'Test', 'Test');
const userCertification = new UserCertification(1, user, certification, certification.id, new Date(),
  null, new Date(), new Date());
const userExam = new UserExam(1, user, userCertification, userCertification.id, exam, exam.id, new Date(), new Date(), new Date(), null);

const userExamSvcStub = {
  getUserExamsForUserCertification: (userCertId: number) => {
    return of([userExam]);
  }
};


describe('UserCertificationListItemComponent', () => {
  let component: UserCertificationListItemComponent;
  let fixture: ComponentFixture<UserCertificationListItemComponent>;
  let store: MockStore<{userCerts: {vendor: Vendor, userCertifications: UserCertification[], errorMessage: string}}>;
  let initialState = {userCerts: {vendor: null, userCertifications: null, errorMessage: null}};
  let userExamSvc: UserExamService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCertificationListItemComponent ],
      imports: [
        RouterTestingModule,
        NgbModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: userCertReducers.userCertReducer
        })
      ],
      providers: [
        provideMockStore({initialState}),
        {provide: UserExamService, useValue: userExamSvcStub}
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    userExamSvc = TestBed.get(UserExamService);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCertificationListItemComponent);
    component = fixture.componentInstance;
    component.userCert = userCertification;
    component.vendors = [vendor];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display vendor title', () => {
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('span.vendor__title--span')
      ).nativeElement.textContent
    ).toEqual(vendor.title);
  });

  it('should display certification title', () => {
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('a.certification__title--a')
      ).nativeElement.textContent
    ).toEqual(certification.title);
  });

  it('should display description', () => {
    component.isCollapsed = false;
    fixture.detectChanges();
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('span.certification__description--span')
      ).nativeElement.textContent
    ).toEqual(` ${certification.description} `);
  });

  it('should dispatch action', () => {
    component.onSelect();
    expect(store.dispatch).toHaveBeenCalledWith(
      new userCertActions.ChooseUserCertification(userCertification)
    );
  });
});
