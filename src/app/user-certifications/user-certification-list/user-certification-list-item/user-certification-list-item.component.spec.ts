import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCertificationListItemComponent } from './user-certification-list-item.component';

describe('UserCertificationListItemComponent', () => {
  let component: UserCertificationListItemComponent;
  let fixture: ComponentFixture<UserCertificationListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCertificationListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCertificationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
