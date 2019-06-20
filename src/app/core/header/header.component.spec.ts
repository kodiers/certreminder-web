import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

import { HeaderComponent } from './header.component';
import {Store} from '@ngrx/store';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<{auth: boolean}>;
  let initialState = {auth: false};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [NgbModule],
      providers: [provideMockStore({initialState})]
    })
    .compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('collapsable should be true', () => {
    expect(component.collapsible).toBeTruthy();
  });

  it('should change collapsable on toggleMenu', () => {
    expect(component.collapsible).toBeTruthy();
    component.toggleMenu();
    expect(component.collapsible).toBeFalsy();
  });

  it('should display log in button', () => {
    // TODO: fix test
    let element = fixture.debugElement.nativeElement;
    expect(element.querySelector('a').textContent).toEqual('Sign In');
  });
});
