import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Component, Input} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Store, StoreModule} from '@ngrx/store';

import { UserCertificationListComponent } from './user-certification-list.component';
import {SharedModule} from '../../shared/shared.module';

import {Vendor} from '../../shared/models/vendor.model';
import {UserCertification} from '../models/user-certification.model';
import * as appReducers from '../../store/app.reducers';
import * as userCertReducers from '../store/user-certifications.reducers';

import {vendor, userCertification} from '../../shared/tests/fixtures/test-data';



@Component({selector: 'app-user-certification-list-item', template: ''})
class UserCertificationListComponentItemStub {
  @Input() userCert: UserCertification;
  @Input() vendors: Vendor[];
}

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);


describe('UserCertificationListComponent', () => {
  let component: UserCertificationListComponent;
  let fixture: ComponentFixture<UserCertificationListComponent>;
  let store: MockStore<{userCerts: {vendors: Vendor[], userCertifications: UserCertification[], errorMessage: string}}>;
  let initialState = {userCerts: {vendors: [vendor], userCertifications: [userCertification], errorMessage: null}};
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserCertificationListComponent,
        UserCertificationListComponentItemStub
      ],
      imports: [
        SharedModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: userCertReducers.userCertReducer
        })
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
    fixture = TestBed.createComponent(UserCertificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display button "Add certification"', () => {
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('button.btn.btn-outline-success.ucl__add')
      ).nativeElement.textContent
    ).toEqual('Add certification');
  });

  it('should navigate to new-user-certification', () => {
    component.addCertification();
    fixture.detectChanges();
    const spy = router.navigate as jasmine.Spy;
    const args = spy.calls.first().args;
    expect(args[0][0]).toEqual('/new-user-certification');
  });
});
