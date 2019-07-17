import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';

import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';
import {combineReducers, Store, StoreModule} from '@ngrx/store';

import { CertificationExamListComponent } from './certification-exam-list.component';
import {SharedModule} from '../../../../shared/shared.module';
import {CertificationExamItemComponent} from './certification-exam-item/certification-exam-item.component';
import {ExamService} from '../../../services/exam.service';
import * as CertActions from '../../../store/certifications.actions';
import * as appReducers from '../../../../store/app.reducers';
import * as certReducers from '../../../store/certifications.reducers';
import {Certification} from '../../../../shared/models/certification.model';
import {Vendor} from '../../../../shared/models/vendor.model';
import {Exam} from '../../../../shared/models/exam.model';


const vendor = new Vendor(1, new Date(), new Date(), 'test', 'test.jpg', 'test');
const certification = new Certification(1, new Date(), new Date(), 'test', 'test', 'test.jpg',
  'test', false, vendor.id);
const exam = new Exam(1, new Date(), new Date(), 'test', 'test-exam-1', 'test',
  false, [certification.id]);

const examSvcStub = {
  getExamsForCertification: (certification: Certification) => {
    const exams = [exam];
    return of(exams);
  }
};

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);


describe('CertificationExamListComponent', () => {
  let component: CertificationExamListComponent;
  let fixture: ComponentFixture<CertificationExamListComponent>;
  let store: MockStore<{certifications: {}}>;
  let examSvc: ExamService;
  let initialState = {certifications: {}};
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CertificationExamListComponent,
        CertificationExamItemComponent
      ],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: combineReducers(certReducers.certReducer)
        }),
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore({initialState}),
        {provide: ExamService, useValue: examSvcStub},
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
    fixture = TestBed.createComponent(CertificationExamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show button \'get exams\'', () => {
    const element = fixture.debugElement;
    expect(element.nativeElement.querySelector('button').textContent).toEqual('Show exams');
  });

  it('should show have exams', () => {
    component.certification = certification;
    component.getExams();
    fixture.detectChanges();
    expect(component.exams.length).toEqual(1);
  });

  it('should navigate to add-exam', () => {
    component.certification = certification;
    component.vendor = vendor;
    fixture.detectChanges();
    component.addExamToCertification();
    expect(store.dispatch).toHaveBeenCalledWith(
      new CertActions.CertificationChoosed({certification: certification, vendor: vendor})
    );
    expect(component.errorMessage).toBeNull();
    const spy = router.navigate as jasmine.Spy;
    const args = spy.calls.first().args;
    expect(args[0][0]).toEqual('add-exam');
    expect(args[0][1]).toEqual(certification.id);
  });
});
