import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import { CertificationItemComponent } from './certification-item.component';
import {SharedModule} from '../../../shared/shared.module';
import {Vendor} from '../../../shared/models/vendor.model';
import {Component, Input} from '@angular/core';
import {Certification} from '../../../shared/models/certification.model';
import {By} from '@angular/platform-browser';


@Component({selector: 'app-certification-exam-list', template: ''})
class CertificationExamListStub {
  @Input() certification;
  @Input() vendor;
}


const vendor = new Vendor(1, new Date(), new Date(), 'test', 'test.jpg', 'test');
const certification = new Certification(1, new Date(), new Date(), 'test', 'test', 'test.jpg',
  'test', false, vendor.id);


describe('CertificationItemComponent', () => {
  let component: CertificationItemComponent;
  let fixture: ComponentFixture<CertificationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CertificationItemComponent,
        CertificationExamListStub
      ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationItemComponent);
    component = fixture.componentInstance;
    component.certification = certification;
    component.vendors = [vendor];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display vendor and certification titles', () => {
    const element = fixture.debugElement;
    expect(
      element.query(
        By.css('span.vendor__title--span')
      ).nativeElement.textContent
    ).toEqual(vendor.title);
    expect(
      element.query(
        By.css('h3')
      ).nativeElement.textContent
    ).toEqual(vendor.title);
  });
});
