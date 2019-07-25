import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Store, StoreModule} from '@ngrx/store';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import * as appReducers from '../../../store/app.reducers';
import * as userCertReducers from '../../store/user-certifications.reducers';
import * as userCertActions from '../../store/user-certifications.actions';
import {UserExamService} from '../../services/user-exam.service';
import {userExam} from '../../../shared/tests/fixtures/test-data';
import { UserCertificationExamComponent } from './user-certification-exam.component';
import {UserExam} from '../../models/user-exam.model';
import {DateModalComponent} from '../../../shared/views/date-modal/date-modal.component';


const userExamSvcStub = {
  deleteUserExam: (userExamId: number) => {
    return of(null);
  },

  updateUserExam: (userExam: UserExam) => {
    const updatedExam = Object.assign({}, userExam);
    return of(updatedExam);
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


describe('UserCertificationExamComponent', () => {
  let component: UserCertificationExamComponent;
  let fixture: ComponentFixture<UserCertificationExamComponent>;
  let store: MockStore<{}>;
  let initialState: {};
  let userExamSvc: UserExamService;
  let modalSvc: NgbModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCertificationExamComponent, DateModalComponent ],
      imports: [
        NgbModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: userCertReducers.userCertReducer
        }),
        FontAwesomeModule
      ],
      providers: [
        provideMockStore({initialState}),
        {provide: UserExamService, useValue: userExamSvcStub},
        {provide: NgbModal, useValue: NgbModalStub}
      ]
    })
    .overrideModule(BrowserDynamicTestingModule, {set: {entryComponents: [DateModalComponent]}})
    .compileComponents();
    store = TestBed.get(Store);
    userExamSvc = TestBed.get(UserExamService);
    modalSvc = TestBed.get(NgbModal);
    // spyOn(modalSvc, 'open').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(userExamSvc, 'updateUserExam').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCertificationExamComponent);
    component = fixture.componentInstance;
    component.userExam = userExam;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display exam title', () => {
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('h5.card-title')
      ).nativeElement.textContent
    ).toEqual(userExam.exam.title);
  });

  it('should delete exam', () => {
    component.deleteExam();
    expect(store.dispatch).toHaveBeenCalledWith(
      new userCertActions.DeleteUserCertExam(userExam)
    );
  });

  it('should open modal', async() => {
    component.openModal();
    expect(component.userExam.date_of_pass.getFullYear()).toEqual(date.getFullYear());
    expect(component.userExam.date_of_pass.getDate()).toEqual(date.getDate());
    expect(component.userExam.date_of_pass.getHours()).toEqual(date.getHours());
    expect(component.userExam.date_of_pass.getMinutes()).toEqual(date.getMinutes());
    expect(component.userExam.date_of_pass.getSeconds()).toEqual(date.getSeconds());
  });
});
