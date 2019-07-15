import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserCertificationComponent } from './new-user-certification.component';

describe('NewUserCertificationComponent', () => {
  let component: NewUserCertificationComponent;
  let fixture: ComponentFixture<NewUserCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
