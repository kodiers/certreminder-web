import { Component, OnInit } from '@angular/core';

import {ProfileService} from '../services/profile.service';
import {Profile} from '../../shared/models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  errorMessage: string = null;

  constructor(private profileSvc: ProfileService) { }

  ngOnInit() {
    this.profileSvc.getUserInfo().subscribe(
      (profile) => {
        this.profile = profile;
      }, (error) => {
        this.errorMessage = 'Could not get profile information!';
        console.error(error);
      });
  }

}
