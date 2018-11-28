import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationItemComponent } from './certification-item.component';

describe('CertificationItemComponent', () => {
  let component: CertificationItemComponent;
  let fixture: ComponentFixture<CertificationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
