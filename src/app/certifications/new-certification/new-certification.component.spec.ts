import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ToastrModule} from 'ngx-toastr';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {StoreModule, Store, combineReducers} from '@ngrx/store';

import { NewCertificationComponent } from './new-certification.component';
import {SharedModule} from '../../shared/shared.module';
import {Vendor} from '../../shared/models/vendor.model';
import {CertificationService} from '../services/certification.service';
import * as appReducers from '../../store/app.reducers';
import * as certReducers from '../store/certifications.reducers';
import {Certification} from '../../shared/models/certification.model';


const vendor = new Vendor(1, new Date(), new Date(), 'test', 'test.jpg', 'test');
const cert = new Certification(1, new Date(), new Date(), 'test', '5A', 'test.jpg',
  'test', false, 1);


const mockCertificationService = {
  createCertification: (data) => {
    return of(cert);
  }
};


const routerSpy = jasmine.createSpyObj('Router', ['navigate']);


describe('NewCertificationComponent', () => {
  let component: NewCertificationComponent;
  let fixture: ComponentFixture<NewCertificationComponent>;
  let store: MockStore<{certifications: {vendor: Vendor}}>;
  let initialState = {certifications: {vendor: vendor}};
  let certSvc: CertificationService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCertificationComponent ],
      imports: [
        SharedModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        FormsModule,
        StoreModule.forRoot({
          ...appReducers.reducers,
          feature: combineReducers(certReducers.certReducer)
        }),
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore({initialState}),
        {provide: CertificationService, useValue: mockCertificationService},
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
    fixture = TestBed.createComponent(NewCertificationComponent);
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
        By.css('form > div.form-row > div.form-group > label')
      ).nativeElement.textContent
    ).toContain('Certification title:');
  });

  it('should submit form', () => {
    let fakeForm = <NgForm>{
      valid: true,
      value: {
        title: cert.title,
        number: cert.number,
        description: cert.description,
        deprecated: false,
        vendor: vendor.id
      }
    };
    component.createCertification(fakeForm);
    expect(component.errorMessage).toBeNull();
    const spy = router.navigate as jasmine.Spy;
    const args = spy.calls.first().args;
    expect(args[0][0]).toEqual('/certifications');
  });
});
