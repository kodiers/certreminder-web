import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { DateModalComponent } from './date-modal.component';

describe('DateModalComponent', () => {
  let component: DateModalComponent;
  let fixture: ComponentFixture<DateModalComponent>;

  beforeEach(async(() => {
    const fakeActiveModalService = jasmine.createSpyObj('NgbActiveModal', ['dismiss', 'close']);
    TestBed.configureTestingModule({
      declarations: [ DateModalComponent ],
      imports: [FontAwesomeModule, NgbModule],
      providers: [{provide: NgbActiveModal, useValue: fakeActiveModalService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    component.title = 'test';
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('h4');
    expect(element.textContent).toEqual('Choose test:');
  });

  it('should set date', () => {
    const date = new Date();
    const fakeEvent = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDay()};
    component.onCertDateSelect(fakeEvent);
    fixture.detectChanges();
    expect(component.choosedDate.getDate()).toEqual(date.getDate());
  });
});
