import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import {SharedModule} from '../../shared/shared.module';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      imports: [SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have description', () => {
    let element = fixture.debugElement.nativeElement;
    expect(element.querySelector('p').textContent).toContain(
      ' This application is designed for IT professionals who are forced to track multiple certifications. You can create a certification (or add your own if it is not in our database), specify the date of passing and add examinations to it (or add your own if not in our database) and indicate the date of their passing. Hope this application helps you keep up. '
    );
  });

  it('should have terms of use', () => {
    let element = fixture.debugElement.nativeElement;
    expect(element.querySelector('h2').textContent).toEqual('Terms of Use');
  });

  it('should have list', () => {
    let element = fixture.debugElement.nativeElement;
    console.log(element.querySelector('li'));
    expect(element.querySelector('li').textContent).toContain('Parties This Agreement is between you and Re:Minder only. Re:Minder, is solely responsible for the Re:Minder App and its content.')
  });
});
