import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error: string = null;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    console.log(form);
    if (form.valid) {
      const username = form.value.username;
      const password = form.value.password;
      const confirm_password = form.value.confirm_password;
      if (username === password ) {
        this.error = 'Username and password could not be same';
        return;
      }
      if (password !== confirm_password) {
        this.error = 'Password and confirmation doesn\'t match';
        return;
      }

    }
  }

}
