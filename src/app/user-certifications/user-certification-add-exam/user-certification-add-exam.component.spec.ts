import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { UserCertificationAddExamComponent } from './user-certification-add-exam.component';
import {certification, exam} from '../../shared/tests/fixtures/test-data';
import {Certification} from '../../shared/models/certification.model';
import {ExamService} from '../../certifications/services/exam.service';


const examSvcStub = {
  getExamsForCertification: (certification: Certification) => {
    return of([exam]);
  }
};


describe('UserCertificationAddExamComponent', () => {
  let component: UserCertificationAddExamComponent;
  let fixture: ComponentFixture<UserCertificationAddExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCertificationAddExamComponent ],
      imports: [
        NgbModule,
        FontAwesomeModule,
        FormsModule
      ],
      providers: [
        NgbActiveModal,
        {provide: ExamService, useValue: examSvcStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCertificationAddExamComponent);
    component = fixture.componentInstance;
    component.certification = certification;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('h4.modal-title')
      ).nativeElement.textContent
    ).toEqual('Add exam to certification:');
  });

  it('should display choose exam', () => {
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('label')
      ).nativeElement.textContent
    ).toEqual('Choose exam');
  });

  it('should select date',  () => {
    const event = {
      year: 2019,
      month: 7,
      day: 17
    };
    component.onCertDateSelect(event);
    fixture.detectChanges();
    expect(component.choosedDate).toEqual(new Date(event.year, event.month - 1, event.day));
  });
});
