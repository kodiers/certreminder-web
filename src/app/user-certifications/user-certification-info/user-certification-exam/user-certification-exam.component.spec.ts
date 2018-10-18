import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCertificationExamComponent } from './user-certification-exam.component';

describe('UserCertificationExamComponent', () => {
  let component: UserCertificationExamComponent;
  let fixture: ComponentFixture<UserCertificationExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCertificationExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCertificationExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
