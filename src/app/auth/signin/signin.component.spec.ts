import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Store, StoreModule, combineReducers} from '@ngrx/store';
import {By} from '@angular/platform-browser';

import { SigninComponent } from './signin.component';
import * as authActions from '../store/auth.actions';
import * as authReducers from '../store/auth.reducers';
import * as appReducers from '../../store/app.reducers';


describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let store: MockStore<{auth: {authenticated: boolean}}>;
  let initialState = {auth: {authenticated: false}};
  let usernameEl: DebugElement;
  let passwordEl: DebugElement;
  let formEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
      imports: [
        FormsModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: combineReducers(authReducers.authReducer)
        })
      ],
      providers: [provideMockStore({initialState})]
    })
    .compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    usernameEl = fixture.debugElement.query(By.css('input[id=username]'));
    passwordEl = fixture.debugElement.query(By.css('input[id=password]'));
    formEl = fixture.debugElement.query(By.css('form'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display form', () => {
    let element = fixture.debugElement;
    expect(
      element.query(
        By.css('form > div.form-group > label')
      ).nativeElement.textContent
    ).toContain('Enter your username:');
  });

  it('should submit form', () => {
    // TODO: debug this
    usernameEl.nativeElement.value = 'test';
    passwordEl.nativeElement.value = 'p@ssw0rd';
    fixture.detectChanges();
    formEl.nativeElement.dispatchEvent(new Event('submit'));
    // cmp.onSignin(cmp);
    expect(store.dispatch).toHaveBeenCalledWith(new authActions.TrySignin({username: undefined, password: undefined}));
  });
});
