import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, NgForm} from '@angular/forms';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Store, StoreModule, combineReducers} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ToastrModule} from 'ngx-toastr';

import { NewExamComponent } from './new-exam.component';
import {SharedModule} from '../../shared/shared.module';
import * as appReducers from '../../store/app.reducers';
import * as certReducers from '../store/certifications.reducers';
import {Certification} from '../../shared/models/certification.model';

import {Exam} from '../../shared/models/exam.model';
import {ExamService} from '../services/exam.service';
import {Router} from '@angular/router';


const cert = new Certification(1, new Date(), new Date(), 'test', '5A', 'test.jpg',
  'test', false, 1);
const exam = new Exam(1, new Date(), new Date(), 'test', 'test1', 'test', false,
  [cert.id]);

const mockExamService = {

  createNewExam: (data) => {
    return of(exam);
  }
};

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);


describe('NewExamComponent', () => {
  let component: NewExamComponent;
  let fixture: ComponentFixture<NewExamComponent>;
  let store: MockStore<{certifications: {certification: Certification}}>;
  let initialState = {certifications: {certification: cert}};
  let examSvc: ExamService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExamComponent ],
      imports: [
        SharedModule,
        FormsModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: combineReducers(certReducers.certReducer)
        }),
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore({initialState}),
        {provide: ExamService, useValue: mockExamService},
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    examSvc = TestBed.get(ExamService);
    router = TestBed.get(Router);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display form', () => {
    let element = fixture.debugElement;
    expect(
      element.query(
        By.css('form > div.form-row > div.form-group > label')
      ).nativeElement.textContent
    ).toContain('Exam title:');
  });

  it('should submit form', () => {
    let fakeForm = <NgForm>{
      valid: true,
      value: {
        title: 'test',
        number: '1-1',
        description: 'test',
        deprecated: false
      }
    };
    component.createExam(fakeForm);
    expect(component.errorMessage).toBeNull();
    const spy = router.navigate as jasmine.Spy;
    const args = spy.calls.first().args;
    expect(args[0][0]).toEqual('/add-exam');
    expect(args[0][1]).toEqual(cert.id);
  });
});
