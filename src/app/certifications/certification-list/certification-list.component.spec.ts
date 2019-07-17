import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {NgxSpinnerModule} from 'ngx-spinner';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {combineReducers, StoreModule} from '@ngrx/store';

import { CertificationListComponent } from './certification-list.component';
import {SharedModule} from '../../shared/shared.module';
import {Certification} from '../../shared/models/certification.model';
import {Vendor} from '../../shared/models/vendor.model';

import * as CertActions from '../store/certifications.actions';
import * as appReducers from '../../store/app.reducers';
import * as certReducers from '../store/certifications.reducers';
import * as userCertReducers from '../../user-certifications/store/user-certifications.reducers';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';


@Component({selector: 'app-certification-item', template: ''})
class CertificationItemStub {
  @Input() certification: Certification;
  @Input() vendors: Array<Vendor>;
}

const vendor = new Vendor(1, new Date(), new Date(), 'test', 'test.jpg', 'test');
const certification = new Certification(1, new Date(), new Date(), 'test', 'test', 'test.jpg',
  'test', false, vendor.id);


describe('CertificationListComponent', () => {
  let component: CertificationListComponent;
  let fixture: ComponentFixture<CertificationListComponent>;
  let store: MockStore<{userCerts: {vendors: Array<Vendor>}}>;
  let initialState = {userCerts: {vendors: [vendor]}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CertificationListComponent,
        CertificationItemStub
      ],
      imports: [
        SharedModule,
        NgxSpinnerModule,
        FormsModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: combineReducers(userCertReducers.userCertReducer)
        }),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        provideMockStore({initialState})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
