import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, NgForm} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {combineReducers, Store, StoreModule} from '@ngrx/store';

import { RestorePasswordComponent } from './restore-password.component';
import {SharedModule} from '../../../shared/shared.module';
import * as authActions from '../../store/auth.actions';
import * as authReducers from '../../store/auth.reducers';
import * as appReducers from '../../../store/app.reducers';


describe('RestorePasswordComponent', () => {
  let component: RestorePasswordComponent;
  let fixture: ComponentFixture<RestorePasswordComponent>;
  let store: MockStore<{auth: {authenticated: boolean}}>;
  let initialState = {auth: {authenticated: false}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePasswordComponent ],
      imports: [
        FormsModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: combineReducers(authReducers.authReducer)
        }),
        SharedModule
      ],
      providers: [
        provideMockStore({initialState})
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordComponent);
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
    ).toContain('Enter your email');
  });

  it('should submit form', () => {
    let fakeForm = <NgForm>{
      valid: true,
      value: {
        email: 'test@test.com',
      }
    };
    component.onResetPassword(fakeForm);
    expect(store.dispatch).toHaveBeenCalledWith(
      new authActions.TryResetPassword({
        email: fakeForm.value.email
      })
    );
  });
});
