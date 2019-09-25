import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';

import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {combineReducers, Store, StoreModule} from '@ngrx/store';

import { RestorePasswordConfirmComponent } from './restore-password-confirm.component';
import {SharedModule} from '../../../shared/shared.module';
import * as appReducers from '../../../store/app.reducers';
import * as authReducers from '../../store/auth.reducers';
import * as authActions from '../../store/auth.actions';


const TOKEN = 'some-token';
const PASSWORD = 'p@ssw0rd';


export class ActivatedRouteStub {
  get params() {
    return of({token: TOKEN})
  }
}


describe('RestorePasswordConfirmComponent', () => {
  let component: RestorePasswordConfirmComponent;
  let fixture: ComponentFixture<RestorePasswordConfirmComponent>;
  let store: MockStore<{auth: {authenticated: boolean}}>;
  let initialState = {auth: {authenticated: false}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePasswordConfirmComponent ],
      imports: [
        FormsModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: combineReducers(authReducers.authReducer)
        }),
        SharedModule
      ],
      providers: [
        provideMockStore({initialState}),
        {provide: ActivatedRoute, useValue: new ActivatedRouteStub()}
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordConfirmComponent);
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
    ).toContain('Enter your password:');
  });

  it('should has token', () => {
    const token = component.passwordResetToken;
    expect(token).toEqual(TOKEN)
  });

  it('should submit form', () => {
    let fakeForm = <NgForm>{
      valid: true,
      value: {
        password: PASSWORD,
        confirm_password: PASSWORD
      }
    };
    component.onRestorePassword(fakeForm);
    expect(store.dispatch).toHaveBeenCalledWith(
      new authActions.TryResetPasswordConfirm({
        token: TOKEN,
        password: PASSWORD,
        confirm_password: PASSWORD
      })
    );
  });
});
