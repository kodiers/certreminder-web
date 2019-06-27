import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, NgForm} from '@angular/forms';
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
    let fakeForm = <NgForm>{
      valid: true,
      value: {
        username: 'test',
        password: 'p@ssw0rd'
      }
    };
    component.onSignin(fakeForm);
    expect(store.dispatch).toHaveBeenCalledWith(
      new authActions.TrySignin({username: fakeForm.value.username, password: fakeForm.value.password})
    );
  });
});
