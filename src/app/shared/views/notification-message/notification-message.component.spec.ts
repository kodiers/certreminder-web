import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMessageComponent } from './notification-message.component';

describe('NotificationMessageComponent', () => {
  let component: NotificationMessageComponent;
  let fixture: ComponentFixture<NotificationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have message', () => {
    component.message = 'test';
    fixture.detectChanges();
    let element = fixture.debugElement.nativeElement.querySelector('div');
    expect(element.textContent).toEqual(' test ');
  });
});
