import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationExamItemComponent } from './certification-exam-item.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
