import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, NgForm} from '@angular/forms';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Store, StoreModule, combineReducers} from '@ngrx/store';
import {By} from '@angular/platform-browser';

import { SignupComponent } from './signup.component';
import * as authActions from '../store/auth.actions';
import * as authReducers from '../store/auth.reducers';
import * as appReducers from '../../store/app.reducers';
import {SharedModule} from '../../shared/shared.module';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let store: MockStore<{auth: {authenticated: boolean}}>;
  let initialState = {auth: {authenticated: false}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        FormsModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: combineReducers(authReducers.authReducer)
        }),
        SharedModule
      ],
      providers: [provideMockStore({initialState})]
    })
    .compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
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
        password: 'p@ssw0rd',
        confirm_password: 'p@ssw0rd'
      }
    };
    component.onSignup(fakeForm);
    expect(store.dispatch).toHaveBeenCalledWith(
      new authActions.TrySignup({
        username: fakeForm.value.username,
        password: fakeForm.value.password,
        confirm_password: fakeForm.value.confirm_password
      })
    );
  });
});
