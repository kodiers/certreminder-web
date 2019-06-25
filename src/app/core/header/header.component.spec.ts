import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

import { HeaderComponent } from './header.component';
import {Store} from '@ngrx/store';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {By} from '@angular/platform-browser';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<{auth: {authenticated: boolean}}>;
  let initialState = {auth: {authenticated: false}};

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
    let element = fixture.debugElement;
    expect(
      element.query(
        By.css('ul.nav.justify-content-end > li.nav-item > a.nav-link')
      ).nativeElement.textContent
    ).toContain('Sign In');
  });

  it('should display logout button', () => {
    store.setState({auth: { authenticated: true}});
    fixture.detectChanges();
    let element = fixture.debugElement;
    expect(
      element.query(
        By.css('ul.nav.justify-content-end > li.nav-item:last-child > a.nav-link')
      ).nativeElement.textContent
    ).toContain('Log Out');
  });
});
