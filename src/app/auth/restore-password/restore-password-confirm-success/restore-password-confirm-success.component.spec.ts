import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordConfirmSuccessComponent } from './restore-password-confirm-success.component';

describe('RestorePasswordConfirmSuccessComponent', () => {
  let component: RestorePasswordConfirmSuccessComponent;
  let fixture: ComponentFixture<RestorePasswordConfirmSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePasswordConfirmSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordConfirmSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
