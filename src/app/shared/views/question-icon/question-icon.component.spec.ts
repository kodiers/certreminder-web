import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { QuestionIconComponent } from './question-icon.component';

describe('QuestionIconComponent', () => {
  let component: QuestionIconComponent;
  let fixture: ComponentFixture<QuestionIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionIconComponent ],
      imports: [NgbModule]
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

  it('should have tooltip', () => {
    component.tooltip = 'Test';
    fixture.detectChanges();
    let element = fixture.debugElement.nativeElement.querySelector('img');
    expect(element.getAttribute('ng-reflect-ngb-tooltip')).toEqual('Test');
  });

  it('should have placement', () => {
    component.placement = 'right';
    fixture.detectChanges();
    let element = fixture.debugElement.nativeElement.querySelector('img');
    expect(element.getAttribute('ng-reflect-placement')).toEqual('right');
  });
});
