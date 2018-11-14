import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationExamListComponent } from './certification-exam-list.component';

describe('CertificationExamListComponent', () => {
  let component: CertificationExamListComponent;
  let fixture: ComponentFixture<CertificationExamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationExamListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationExamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
