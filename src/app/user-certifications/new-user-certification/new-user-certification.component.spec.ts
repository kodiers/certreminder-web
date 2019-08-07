import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserCertificationComponent } from './new-user-certification.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {RouterTestingModule} from '@angular/router/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Vendor} from '../../shared/models/vendor.model';
import {vendor} from '../../shared/tests/fixtures/test-data';
import {Router} from '@angular/router';
import * as appReducers from '../../store/app.reducers';
import * as userCertReducers from '../store/user-certifications.reducers';
import {Store, StoreModule} from '@ngrx/store';
import {HttpClientTestingModule} from '@angular/common/http/testing';

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

describe('NewUserCertificationComponent', () => {
  let component: NewUserCertificationComponent;
  let fixture: ComponentFixture<NewUserCertificationComponent>;
  let store: MockStore<{userCerts: {vendors: Vendor[]}}>;
  let initialState = {userCerts: {vendors: [vendor]}};
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserCertificationComponent ],
      imports: [
        SharedModule,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: userCertReducers.userCertReducer
        }),
        HttpClientTestingModule
      ],
      providers: [
        provideMockStore({initialState}),
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
