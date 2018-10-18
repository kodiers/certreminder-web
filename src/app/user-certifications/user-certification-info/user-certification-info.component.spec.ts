import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCertificationInfoComponent } from './user-certification-info.component';

describe('UserCertificationInfoComponent', () => {
  let component: UserCertificationInfoComponent;
  let fixture: ComponentFixture<UserCertificationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCertificationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCertificationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
