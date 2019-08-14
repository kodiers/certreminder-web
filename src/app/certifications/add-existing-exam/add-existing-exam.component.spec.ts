import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

import {NgxSpinnerModule} from 'ngx-spinner';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Store, StoreModule} from '@ngrx/store';

import { AddExistingExamComponent } from './add-existing-exam.component';
import {SharedModule} from '../../shared/shared.module';
import {Exam} from '../../shared/models/exam.model';
import {Certification} from '../../shared/models/certification.model';
import {Vendor} from '../../shared/models/vendor.model';
import {ExamService} from '../services/exam.service';
import * as appReducers from '../../store/app.reducers';
import * as certReducers from '../store/certifications.reducers';


@Component({selector: 'app-certification-exam-item', template: ''})
class CertificationExamItemStub {
  @Input() exam: Exam;
}

const vendor = new Vendor(1, new Date(), new Date(), 'test', 'test.jpg', 'test');
const certification = new Certification(1, new Date(), new Date(), 'test', 'test', 'test.jpg',
  'test', false, vendor.id);
const exam = new Exam(1, new Date(), new Date(), 'test', 'test-1', 'test', false,
  [certification.id]);
const exam2 = new Exam(1, new Date(), new Date(), 'example', 'example-1', 'example',
  false, [certification.id]);
const exams = [exam, exam2];


const ExamServiceStub = {
  getExamsForVendorId: (vendorId: number) => {
    return of(exams);
  },

  addCertificationToExam: () => {
    return of(exam);
  }
};


const routerSpy = jasmine.createSpyObj('Router', ['navigate']);


describe('AddExistingExamComponent', () => {
  let component: AddExistingExamComponent;
  let fixture: ComponentFixture<AddExistingExamComponent>;
  let store: MockStore<{certifications: {certification: Certification, vendor: Vendor}}>;
  let initialState = {certifications: {certification: certification, vendor: vendor}};
  let examSvc: ExamService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddExistingExamComponent,
        CertificationExamItemStub
      ],
      imports: [
        FormsModule,
        SharedModule,
        NgxSpinnerModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: certReducers.certReducer
        })
      ],
      providers: [
        provideMockStore({initialState}),
        {provide: Router, useValue: routerSpy},
        {provide: ExamService, useValue: ExamServiceStub}
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    examSvc = TestBed.get(ExamService);
    router = TestBed.get(Router);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExistingExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display reset button', () => {
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('div.col-sm-1.text-center > button.btn.btn-outline-dark')
      ).nativeElement.textContent
    ).toEqual('Reset');
  });

  it('should display add button', () => {
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('div.row > div.col-sm-8 > ul.list-group > li.list-group-item > div.row > div.col-sm-2.text-center > button.btn.btn-outline-success')
      ).nativeElement.textContent
    ).toEqual('Add');
  });

  it('should filter exam', () => {
    expect(component.exams.length).toEqual(2);
    expect(component.initialExams.length).toEqual(2);
    component.searchStr = 'example';
    component.filterExams();
    fixture.detectChanges();
    expect(component.exams.length).toEqual(1);
    expect(component.initialExams.length).toEqual(2);
    expect(component.exams[0]).toEqual(exam2);
  });

  it('should filter exam no results', () => {
    expect(component.exams.length).toEqual(2);
    expect(component.initialExams.length).toEqual(2);
    component.searchStr = 'no-results';
    component.filterExams();
    fixture.detectChanges();
    expect(component.exams.length).toEqual(0);
    expect(component.initialExams.length).toEqual(2);
  });

  it('should reset search', () => {
    expect(component.exams.length).toEqual(2);
    expect(component.initialExams.length).toEqual(2);
    component.searchStr = 'example';
    component.filterExams();
    fixture.detectChanges();
    expect(component.exams.length).toEqual(1);
    expect(component.initialExams.length).toEqual(2);
    expect(component.exams[0]).toEqual(exam2);
    component.searchStr = null;
    component.filterExams();
    fixture.detectChanges();
    expect(component.exams.length).toEqual(2);
    expect(component.initialExams.length).toEqual(2);
    expect(component.searchStr).toBeNull();
  });

  it('should add exam', () => {
    expect(component.errorMessage).toBeNull();
    expect(component.infoMessage).toBeNull();
    component.addExamToCertification(exam);
    fixture.detectChanges();
    expect(component.infoMessage).toEqual(`Exam: ${exam.title} successfully added to certification ${certification.title}.`);
  });

  it('should navigate to new exam', () => {
    component.newExam();
    fixture.detectChanges();
    const spy = router.navigate as jasmine.Spy;
    const args = spy.calls.first().args;
    expect(args[0][0]).toEqual('/new-exam');
  });
});
