import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';

import { ProfileComponent } from './profile.component';
import {SharedModule} from '../../shared/shared.module';
import {User} from '../../shared/models/user.model';
import {Profile} from '../../shared/models/profile.model';
import {ProfileService} from '../services/profile.service';


const testUser =  new User(1, 'test', 'test@test.com', 'test', 'test');
const testProfile = new Profile(1, testUser, 'test-token', new Date(), new Date(), 'Ru',
  '1988-19-08', 'test', 'test.img');

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let getUserSpy: any;

  beforeEach(async(() => {
    const fakeProfileService = jasmine.createSpyObj('ProfileService', ['getUserInfo']);
    getUserSpy = fakeProfileService.getUserInfo.and.returnValue(of(testProfile));
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [SharedModule],
      providers: [{provide: ProfileService, useValue: fakeProfileService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get profile on initialization', () => {
    fixture.detectChanges();
    expect(component.profile).toEqual(testProfile);
  });
});


/*
Using this test case to inject service for test when ProfileService returns error
 */
describe('ProfileComponentWithError', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    const fakeProfileService = jasmine.createSpyObj('ProfileService', ['getUserInfo']);
    let getUserSpy = fakeProfileService.getUserInfo.and.returnValue(throwError('error'));
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [SharedModule],
      providers: [{provide: ProfileService, useValue: fakeProfileService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get error on initialization', () => {
    fixture.detectChanges();
    expect(component.errorMessage).toEqual('Could not get profile information!');
  });
});
