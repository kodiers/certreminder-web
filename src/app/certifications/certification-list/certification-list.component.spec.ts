import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';

import {NgxSpinnerModule} from 'ngx-spinner';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {combineReducers, Store, StoreModule} from '@ngrx/store';

import { CertificationListComponent } from './certification-list.component';
import {SharedModule} from '../../shared/shared.module';
import {Certification} from '../../shared/models/certification.model';
import {Vendor} from '../../shared/models/vendor.model';
import {CertificationService} from '../services/certification.service';

import * as CertActions from '../store/certifications.actions';
import * as appReducers from '../../store/app.reducers';
import * as userCertReducers from '../../user-certifications/store/user-certifications.reducers';


@Component({selector: 'app-certification-item', template: ''})
class CertificationItemStub {
  @Input() certification: Certification;
  @Input() vendors: Array<Vendor>;
}

const vendor = new Vendor(1, new Date(), new Date(), 'test', 'test.jpg', 'test');
const certification = new Certification(1, new Date(), new Date(), 'test', 'test', 'test.jpg',
  'test', false, vendor.id);
const certification2 = new Certification(2, new Date(), new Date(), 'other', 'other', 'other.jpg',
  'other', false, vendor.id);
const certifications = [certification, certification2];


const CertificationServiceStub = {
  getCertificationsForVendor: (vendor: Vendor) => {
    return of(certifications);
  }
};

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);


describe('CertificationListComponent', () => {
  let component: CertificationListComponent;
  let fixture: ComponentFixture<CertificationListComponent>;
  let store: MockStore<{userCerts: {vendors: Array<Vendor>}}>;
  let initialState = {userCerts: {vendors: [vendor]}};
  let certSvc: CertificationService;
  let router: Router;

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
        provideMockStore({initialState}),
        {provide: CertificationService, useValue: CertificationServiceStub},
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();
    store = TestBed.get(Store);
    certSvc = TestBed.get(CertificationService);
    router = TestBed.get(Router);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display vendor', () => {
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('button.btn.btn-outline-info.cl__vendor--btn')
      ).nativeElement.textContent
    ).toEqual(vendor.title);
  });

  it('should have certifications and display reset button', () => {
    component.selectVendor(vendor);
    fixture.detectChanges();
    expect(component.certifications[0]).toEqual(certification);
    expect(component.initialCertifications[0]).toEqual(certification);
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('button.btn.btn-outline-dark')
      ).nativeElement.textContent
    ).toEqual('Reset');
  });

  it('should filter certifications', () => {
    component.selectVendor(vendor);
    fixture.detectChanges();
    expect(component.certifications[0]).toEqual(certification);
    component.searchStr = certification2.title;
    component.filterCertifications(certification2.title);
    expect(component.certifications.length).toEqual(1);
    expect(component.certifications[0].title).toEqual(certification2.title);
    expect(component.initialCertifications.length).toEqual(certifications.length);
  });

  it('should reset search', () => {
    component.selectVendor(vendor);
    fixture.detectChanges();
    expect(component.certifications[0]).toEqual(certification);
    component.searchStr = certification2.title;
    component.filterCertifications(certification2.title);
    expect(component.certifications.length).toEqual(1);
    component.searchStr = '';
    component.filterCertifications('');
    expect(component.certifications.length).toEqual(certifications.length);
    expect(component.certifications[0]).toEqual(certification);
    expect(component.initialCertifications[0]).toEqual(certification);
    expect(component.certifications[1]).toEqual(certification2);
    expect(component.initialCertifications[1]).toEqual(certification2);
  });

  it('should navigate to new certification', () => {
    component.selectVendor(vendor);
    fixture.detectChanges();
    component.createCertification();
    expect(store.dispatch).toHaveBeenCalledWith(
      new CertActions.VendorForCreateChoosed(vendor)
    );
    const spy = router.navigate as jasmine.Spy;
    const args = spy.calls.first().args;
    expect(args[0][0]).toEqual('/new-certification');
  });
});
