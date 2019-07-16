import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import { CertificationExamItemComponent } from './certification-exam-item.component';
import {Exam} from '../../../../../shared/models/exam.model';


const exam = new Exam(1, new Date(), new Date(), 'test', 'test-number',  'test',
  false, [1]);

describe('CertificationExamItemComponent', () => {
  let component: CertificationExamItemComponent;
  let fixture: ComponentFixture<CertificationExamItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationExamItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationExamItemComponent);
    component = fixture.componentInstance;
    component.exam = exam;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display exam title and number', () => {
    const element = fixture.debugElement;
    expect(element.nativeElement.querySelector('h5').textContent).toContain('test');
    expect(element.query(By.css('div.row > div.col-sm-12 > h5 > span'))).toBeTruthy();
  });

  it('should display title only', () => {
    component.exam.number = null;
    fixture.detectChanges();
    const element = fixture.debugElement;
    expect(element.nativeElement.querySelector('h5').textContent).toContain('test');
    expect(element.query(By.css('div.row > div.col-sm-12 > h5 > span'))).toBeNull();
  })
});
