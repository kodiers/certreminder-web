import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCertificationAddExamComponent } from './user-certification-add-exam.component';

describe('UserCertificationAddExamComponent', () => {
  let component: UserCertificationAddExamComponent;
  let fixture: ComponentFixture<UserCertificationAddExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCertificationAddExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCertificationAddExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
