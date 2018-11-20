import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExistingExamComponent } from './add-existing-exam.component';

describe('AddExistingExamComponent', () => {
  let component: AddExistingExamComponent;
  let fixture: ComponentFixture<AddExistingExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExistingExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExistingExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
