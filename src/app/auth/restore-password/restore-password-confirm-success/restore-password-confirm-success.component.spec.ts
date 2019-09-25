import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {provideMockStore} from '@ngrx/store/testing';
import {combineReducers, StoreModule} from '@ngrx/store';

import { RestorePasswordConfirmSuccessComponent } from './restore-password-confirm-success.component';
import * as appReducers from '../../../store/app.reducers';
import * as authReducers from '../../store/auth.reducers';


describe('RestorePasswordConfirmSuccessComponent', () => {
  let component: RestorePasswordConfirmSuccessComponent;
  let fixture: ComponentFixture<RestorePasswordConfirmSuccessComponent>;
  let initialState = {auth: {authenticated: false}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePasswordConfirmSuccessComponent ],
      imports: [
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: combineReducers(authReducers.authReducer)
        }),
      ],
      providers: [
        provideMockStore({initialState})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordConfirmSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header', () => {
    let element = fixture.debugElement;
    expect(
      element.nativeElement.querySelector('h1').textContent
    ).toEqual('You successfully reset your password.');
  })
});
