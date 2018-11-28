import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionIconComponent } from './question-icon.component';

describe('QuestionIconComponent', () => {
  let component: QuestionIconComponent;
  let fixture: ComponentFixture<QuestionIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
