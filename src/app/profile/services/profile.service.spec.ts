import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { ProfileService } from './profile.service';
import {User} from '../../shared/models/user.model';
import {Profile} from '../../shared/models/profile.model';
import {API_URL} from '../../shared/constants';


const testUser =  new User(1, 'test', 'test@test.com', 'test', 'test');
const testProfile = new Profile(1, testUser, 'test-token', new Date(), new Date(), 'Ru',
  '1988-19-08', 'test', 'test.img');


describe('ProfileService', () => {
  let httpTestingController: HttpTestingController;
  let profileService: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    profileService = TestBed.get(ProfileService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(profileService).toBeTruthy();
  });

  it('should get profile', () => {
    profileService.getUserInfo().subscribe(data => {
      expect(data.id).toEqual(testProfile.id);
      expect(data.token).toEqual(testProfile.token);
      expect(data.created).toEqual(testProfile.created);
      expect(data.updated).toEqual(testProfile.updated);
      expect(data.country).toEqual(testProfile.country);
      expect(data.date_of_birth).toEqual(testProfile.date_of_birth);
      expect(data.description).toEqual(testProfile.description);
      expect(data.avatar).toEqual(testProfile.avatar);
      expect(data.user.username).toEqual(testProfile.user.username);
    });
    const req = httpTestingController.expectOne(API_URL + 'people/user/');
    req.flush(testProfile);
  });
});
