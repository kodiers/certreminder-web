import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotFoundComponent } from './hot-found.component';

describe('HotFoundComponent', () => {
  let component: HotFoundComponent;
  let fixture: ComponentFixture<HotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
