import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    if (form.valid) {
      const username = form.value.username;
      const password = form.value.password;
      const confirm_password = form.value.confirm_password;
      console.log(username, password, confirm_password);
    }
  }

}
